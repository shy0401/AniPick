import { useEffect, useState } from 'react';
import { adminApi } from '../api/adminApi';
import { noticeApi } from '../api/noticeApi';
import { translationApi } from '../api/translationApi';

function Admin() {
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [notices, setNotices] = useState([]);
  const [noticeForm, setNoticeForm] = useState({ title: '', content: '' });
  const [translationForm, setTranslationForm] = useState({
    provider: 'JIKAN',
    externalId: '',
    lang: 'ko',
    title: '',
    description: '',
    source: 'MANUAL',
    status: 'REVIEWED',
  });
  const [translationsView, setTranslationsView] = useState([]);
  const [coverage, setCoverage] = useState(null);
  const [missingTranslations, setMissingTranslations] = useState([]);
  const [translationMessage, setTranslationMessage] = useState('');
  const [translationLoading, setTranslationLoading] = useState(false);
  const [animeRows, setAnimeRows] = useState([]);
  const [animePageInfo, setAnimePageInfo] = useState(null);
  const [animeQuery, setAnimeQuery] = useState({
    keyword: '',
    status: 'ALL',
    isAdult: 'ALL',
    isHidden: 'ALL',
    page: 1,
    perPage: 20,
  });
  const [animeMessage, setAnimeMessage] = useState('');
  const [animeLoading, setAnimeLoading] = useState(false);
  const [modelInfo, setModelInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    setLoading(true);
    setError('');

    try {
      const [userData, reviewData, noticeData] = await Promise.all([
        adminApi.getUsers(),
        adminApi.getAllReviews(),
        noticeApi.getNotices(),
      ]);

      setUsers(userData);
      setReviews(reviewData);
      setNotices(noticeData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load admin data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  useEffect(() => {
    loadAnimeRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAnimeRows = async (nextQuery = animeQuery) => {
    setAnimeLoading(true);
    setAnimeMessage('');
    try {
      const params = {
        ...nextQuery,
      };
      if (params.status === 'ALL') delete params.status;
      if (params.isAdult === 'ALL') delete params.isAdult;
      if (params.isHidden === 'ALL') delete params.isHidden;
      if (!params.keyword) delete params.keyword;

      const data = await adminApi.getAnime(params);
      setAnimeRows(data.items || []);
      setAnimePageInfo(data.pageInfo || null);
    } catch (err) {
      setAnimeMessage(err.response?.data?.message || '애니 목록을 불러오지 못했습니다.');
    } finally {
      setAnimeLoading(false);
    }
  };

  const handleDeleteReview = async (id) => {
    await adminApi.deleteReview(id);
    setReviews((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCreateNotice = async (event) => {
    event.preventDefault();
    if (!noticeForm.title.trim() || !noticeForm.content.trim()) return;

    const created = await noticeApi.createNotice(noticeForm);
    setNotices((prev) => [created, ...prev]);
    setNoticeForm({ title: '', content: '' });
  };

  const handleDeleteNotice = async (id) => {
    await noticeApi.deleteNotice(id);
    setNotices((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAnimeAction = async (action, anime) => {
    try {
      setAnimeMessage('');
      setAnimeLoading(true);
      if (action === 'hide') {
        await adminApi.hideAnime(anime.id, 'ADMIN_HIDDEN_MANUAL');
      } else if (action === 'unhide') {
        await adminApi.unhideAnime(anime.id);
      } else if (action === 'adult') {
        await adminApi.markAnimeAdult(anime.id);
      } else if (action === 'archive') {
        await adminApi.archiveAnime(anime.id);
      }
      await loadAnimeRows();
    } catch (err) {
      setAnimeMessage(err.response?.data?.message || '애니 상태 변경에 실패했습니다.');
    } finally {
      setAnimeLoading(false);
    }
  };

  const validateExternalId = () => {
    const id = Number(translationForm.externalId);
    if (!Number.isInteger(id) || id <= 0) {
      setTranslationMessage('externalId must be a positive number.');
      return null;
    }
    return id;
  };

  const handleFetchTranslations = async () => {
    setTranslationMessage('');
    const id = validateExternalId();
    if (!id) return;

    try {
      setTranslationLoading(true);
      const data = await translationApi.getTranslations(translationForm.provider, id);
      setTranslationsView(data.translations || []);
      setTranslationMessage('Translations loaded.');
    } catch (err) {
      setTranslationsView([]);
      setTranslationMessage(err.response?.data?.message || 'Failed to load translations.');
    } finally {
      setTranslationLoading(false);
    }
  };

  const handleSaveTranslation = async () => {
    setTranslationMessage('');
    const id = validateExternalId();
    if (!id) return;

    try {
      setTranslationLoading(true);
      await translationApi.upsertTranslation(translationForm.provider, id, {
        lang: translationForm.lang,
        title: translationForm.title,
        description: translationForm.description,
        source: translationForm.source,
        status: translationForm.status,
      });
      setTranslationMessage('Translation saved.');
      await handleFetchTranslations();
    } catch (err) {
      setTranslationMessage(err.response?.data?.message || 'Failed to save translation.');
    } finally {
      setTranslationLoading(false);
    }
  };

  const handleAutoTranslate = async () => {
    setTranslationMessage('');
    const id = validateExternalId();
    if (!id) return;

    try {
      setTranslationLoading(true);
      await translationApi.autoTranslate(translationForm.provider, id, {
        targetLangs: ['ko', 'ja'],
        overwrite: true,
      });
      setTranslationMessage('Auto translation completed.');
      await handleFetchTranslations();
    } catch (err) {
      setTranslationMessage(err.response?.data?.message || 'Auto translation failed.');
    } finally {
      setTranslationLoading(false);
    }
  };

  const handleDeleteTranslation = async (lang) => {
    const id = validateExternalId();
    if (!id) return;

    await translationApi.deleteTranslation(translationForm.provider, id, lang);
    await handleFetchTranslations();
  };

  const handleCheckOpenAIModels = async () => {
    setTranslationMessage('');
    setTranslationLoading(true);
    try {
      const info = await translationApi.getOpenAIModels();
      setModelInfo(info);
      if (info.ok) {
        setTranslationMessage(`선택 모델: ${info.selectedModel}`);
      } else {
        setTranslationMessage(info.message || '모델 접근 권한을 확인해 주세요.');
      }
    } catch (err) {
      setModelInfo(null);
      setTranslationMessage(err.response?.data?.message || '모델 조회에 실패했습니다.');
    } finally {
      setTranslationLoading(false);
    }
  };

  const handleLoadCoverage = async () => {
    setTranslationMessage('');
    setTranslationLoading(true);
    try {
      const data = await translationApi.getCoverage();
      setCoverage(data);
      setTranslationMessage('Translation coverage loaded.');
    } catch (err) {
      setTranslationMessage(err.response?.data?.message || 'Failed to load translation coverage.');
    } finally {
      setTranslationLoading(false);
    }
  };

  const handleLoadMissing = async () => {
    setTranslationMessage('');
    setTranslationLoading(true);
    try {
      const rows = await translationApi.getMissingTranslations({ lang: translationForm.lang, limit: 50 });
      setMissingTranslations(rows);
      setTranslationMessage(`Missing translations loaded: ${rows.length}`);
    } catch (err) {
      setTranslationMessage(err.response?.data?.message || 'Failed to load missing translations.');
    } finally {
      setTranslationLoading(false);
    }
  };

  const handleCreateJobs = async () => {
    setTranslationMessage('');
    setTranslationLoading(true);
    try {
      const data = await translationApi.createJobs({ langs: ['ko', 'ja'], limit: 100 });
      setTranslationMessage(`Translation jobs created: ${data.created}`);
      await handleLoadCoverage();
    } catch (err) {
      setTranslationMessage(err.response?.data?.message || 'Failed to create translation jobs.');
    } finally {
      setTranslationLoading(false);
    }
  };

  const handleRunJobs = async () => {
    setTranslationMessage('');
    setTranslationLoading(true);
    try {
      const data = await translationApi.runJobs({ langs: ['ko', 'ja'], limit: 10 });
      setTranslationMessage(`Translation jobs finished: ${(data.results || []).length}`);
      await handleLoadCoverage();
    } catch (err) {
      setTranslationMessage(err.response?.data?.message || 'Failed to run translation jobs.');
    } finally {
      setTranslationLoading(false);
    }
  };

  if (loading) return <p className="page-message">Loading admin page...</p>;

  return (
    <div className="page-wrap">
      <h1>Admin Page</h1>
      {error && <p className="page-error">{error}</p>}

      <section className="anime-section">
        <h2>Users</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Nickname</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.nickname}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="anime-section">
        <h2>All Reviews</h2>
        {reviews.map((review) => (
          <article key={review.id} className="review-item">
            <div className="review-head">
              <strong>{review.user?.nickname || 'Unknown'} ({review.user?.email || '-'})</strong>
              <span>Anime #{review.animeId} | {review.rating}/5</span>
            </div>
            <p>{review.content}</p>
            <button type="button" onClick={() => handleDeleteReview(review.id)}>
              Delete Review
            </button>
          </article>
        ))}
      </section>

      <section className="anime-section">
        <h2>Notices</h2>
        <form className="review-form" onSubmit={handleCreateNotice}>
          <label>
            Title
            <input
              value={noticeForm.title}
              onChange={(event) => setNoticeForm((prev) => ({ ...prev, title: event.target.value }))}
            />
          </label>
          <label>
            Content
            <textarea
              value={noticeForm.content}
              onChange={(event) => setNoticeForm((prev) => ({ ...prev, content: event.target.value }))}
              rows={3}
            />
          </label>
          <button className="button-primary" type="submit">Create Notice</button>
        </form>

        {notices.map((notice) => (
          <article key={notice.id} className="review-item">
            <div className="review-head">
              <strong>{notice.title}</strong>
              <button type="button" onClick={() => handleDeleteNotice(notice.id)}>Delete</button>
            </div>
            <p>{notice.content}</p>
          </article>
        ))}
      </section>

      <section className="anime-section">
        <h2>Anime Management</h2>
        <div className="search-filters">
          <label>
            Keyword
            <input
              value={animeQuery.keyword}
              onChange={(event) => setAnimeQuery((prev) => ({ ...prev, keyword: event.target.value }))}
            />
          </label>
          <label>
            Status
            <select
              value={animeQuery.status}
              onChange={(event) => setAnimeQuery((prev) => ({ ...prev, status: event.target.value, page: 1 }))}
            >
              <option value="ALL">ALL</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="HIDDEN">HIDDEN</option>
              <option value="ADULT">ADULT</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </select>
          </label>
          <label>
            isAdult
            <select
              value={animeQuery.isAdult}
              onChange={(event) => setAnimeQuery((prev) => ({ ...prev, isAdult: event.target.value, page: 1 }))}
            >
              <option value="ALL">ALL</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </label>
          <label>
            isHidden
            <select
              value={animeQuery.isHidden}
              onChange={(event) => setAnimeQuery((prev) => ({ ...prev, isHidden: event.target.value, page: 1 }))}
            >
              <option value="ALL">ALL</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </label>
        </div>
        <div className="filter-actions">
          <button type="button" className="button-secondary" onClick={() => loadAnimeRows()} disabled={animeLoading}>
            {animeLoading ? 'Loading...' : '조회'}
          </button>
        </div>
        {animeMessage && <p className="page-message">{animeMessage}</p>}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Poster</th>
                <th>DB ID</th>
                <th>External ID</th>
                <th>Provider</th>
                <th>Title</th>
                <th>Flags</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {animeRows.map((anime) => (
                <tr key={anime.id}>
                  <td>
                    {anime.imageUrl ? (
                      <img src={anime.imageUrl} alt={anime.englishTitle || anime.romajiTitle || String(anime.externalId)} style={{ width: 48, borderRadius: 8 }} />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>{anime.id}</td>
                  <td>{anime.externalId}</td>
                  <td>{anime.provider}</td>
                  <td>{anime.englishTitle || anime.romajiTitle || anime.nativeTitle || '-'}</td>
                  <td>
                    {anime.isAdult ? '[ADULT] ' : ''}
                    {anime.isHidden ? '[HIDDEN]' : ''}
                  </td>
                  <td>{anime.dataStatus}</td>
                  <td>
                    <div className="filter-actions">
                      <button type="button" className="button-small" onClick={() => handleAnimeAction('hide', anime)}>숨김</button>
                      <button type="button" className="button-small" onClick={() => handleAnimeAction('adult', anime)}>성인 표시</button>
                      <button type="button" className="button-small" onClick={() => handleAnimeAction('unhide', anime)}>복구</button>
                      <button type="button" className="button-small" onClick={() => handleAnimeAction('archive', anime)}>삭제(보관)</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {animePageInfo && (
          <p className="muted">
            page {animePageInfo.currentPage} / {animePageInfo.lastPage} (total {animePageInfo.total})
          </p>
        )}
      </section>

      <section className="anime-section">
        <h2>Translation Management</h2>
        <div className="search-filters">
          <label>
            Provider
            <input
              value={translationForm.provider}
              onChange={(event) => setTranslationForm((prev) => ({ ...prev, provider: event.target.value.toUpperCase() }))}
            />
          </label>
          <label>
            External ID
            <input
              value={translationForm.externalId}
              onChange={(event) => setTranslationForm((prev) => ({ ...prev, externalId: event.target.value }))}
            />
          </label>
          <label>
            Lang
            <select
              value={translationForm.lang}
              onChange={(event) => setTranslationForm((prev) => ({ ...prev, lang: event.target.value }))}
            >
              <option value="ko">ko</option>
              <option value="en">en</option>
              <option value="ja">ja</option>
            </select>
          </label>
          <label>
            Source
            <select
              value={translationForm.source}
              onChange={(event) => setTranslationForm((prev) => ({ ...prev, source: event.target.value }))}
            >
              <option value="MANUAL">MANUAL</option>
              <option value="GPT">GPT</option>
              <option value="API">API</option>
            </select>
          </label>
          <label>
            Status
            <select
              value={translationForm.status}
              onChange={(event) => setTranslationForm((prev) => ({ ...prev, status: event.target.value }))}
            >
              <option value="REVIEWED">REVIEWED</option>
              <option value="AUTO">AUTO</option>
            </select>
          </label>
        </div>

        <div className="review-form">
          <label>
            Title
            <input
              value={translationForm.title}
              onChange={(event) => setTranslationForm((prev) => ({ ...prev, title: event.target.value }))}
            />
          </label>
          <label>
            Description
            <textarea
              rows={5}
              value={translationForm.description}
              onChange={(event) => setTranslationForm((prev) => ({ ...prev, description: event.target.value }))}
            />
          </label>
        </div>

        <div className="filter-actions">
          <button type="button" className="button-secondary" onClick={handleCheckOpenAIModels} disabled={translationLoading}>
            {translationLoading ? '처리 중...' : 'OpenAI 모델 확인'}
          </button>
          <button type="button" className="button-secondary" onClick={handleLoadCoverage} disabled={translationLoading}>
            커버리지
          </button>
          <button type="button" className="button-secondary" onClick={handleLoadMissing} disabled={translationLoading}>
            누락 목록
          </button>
          <button type="button" className="button-secondary" onClick={handleCreateJobs} disabled={translationLoading}>
            작업 생성
          </button>
          <button type="button" className="button-secondary" onClick={handleRunJobs} disabled={translationLoading}>
            작업 실행
          </button>
          <button type="button" className="button-secondary" onClick={handleFetchTranslations} disabled={translationLoading}>
            {translationLoading ? '처리 중...' : '조회'}
          </button>
          <button type="button" className="button-primary" onClick={handleSaveTranslation} disabled={translationLoading}>
            {translationLoading ? '처리 중...' : '저장'}
          </button>
          <button type="button" className="button-secondary" onClick={handleAutoTranslate} disabled={translationLoading}>
            {translationLoading ? '처리 중...' : '자동 번역'}
          </button>
        </div>

        {translationMessage && <p className="page-message">{translationMessage}</p>}
        {modelInfo && (
          <article className="review-item">
            <p><strong>Selected:</strong> {modelInfo.selectedModel || '-'}</p>
            <p><strong>Accessible:</strong> {(modelInfo.accessibleCandidates || []).join(', ') || '-'}</p>
            <p><strong>Candidates:</strong> {(modelInfo.candidates || []).join(', ') || '-'}</p>
            <p><strong>Unavailable:</strong> {(modelInfo.unavailableModels || []).join(', ') || '-'}</p>
          </article>
        )}

        {coverage && (
          <article className="review-item">
            <p><strong>Total Anime:</strong> {coverage.totalAnime}</p>
            <p><strong>Translations:</strong> {(coverage.translations || []).map((row) => `${row.lang}/${row.source}/${row.status}: ${row.count}`).join(' | ') || '-'}</p>
            <p><strong>Jobs:</strong> {(coverage.jobs || []).map((row) => `${row.lang}/${row.status}: ${row.count}`).join(' | ') || '-'}</p>
          </article>
        )}

        {missingTranslations.length > 0 && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Provider</th>
                  <th>Title</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {missingTranslations.map((anime) => (
                  <tr key={`${anime.provider}-${anime.externalId}`}>
                    <td>{anime.externalId}</td>
                    <td>{anime.provider}</td>
                    <td>{anime.englishTitle || anime.romajiTitle || anime.nativeTitle || '-'}</td>
                    <td>{anime.averageScore || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="review-list">
          {translationsView.map((row) => (
            <article key={row.id} className="review-item">
              <div className="review-head">
                <strong>{row.lang} / {row.source} / {row.status}</strong>
                <button type="button" onClick={() => handleDeleteTranslation(row.lang)}>Delete</button>
              </div>
              <p><strong>Title:</strong> {row.title || '-'}</p>
              <p>{row.description || '-'}</p>
              {row.failureReason && <p><strong>Failure:</strong> {row.failureReason}</p>}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Admin;
