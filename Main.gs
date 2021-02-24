// (c) RSChiang 2021, under MIT License.

const Config = {
  sheetId: '<INSERT_SHEET_ID>',
  ranges: {
    submissions: '投稿內容!A:Z',
    discussions: '評分與討論!C3:D50',
    scores: '評分與討論!J1:ZZ3'
  },
  fields: ['timestamp', 'author', 'type', 'title', 'abstract', 'outline', 'audience', 'prerequisites', 'description', 'keywords', 'topics', 'attachments'],
  labels: { outline: '演講大綱', audience: '目標受眾', prerequisites: '先備知識', description: '詳細說明', topics: '相關主題', attachments: '附件', timestamp: '投稿時間' }
};

function getSubmissions() {
  // Fetch values from the spreadsheet. Skip the first (title) row.
  let values = Sheets.Spreadsheets.Values.get(Config.sheetId, Config.ranges.submissions).values;
  let submissions = values.slice(1).map((row) => {
    let submission = {};
    Config.fields.forEach((field, i) => submission[field] = (row[i] || ''));
    submission.type = submission.type.slice(0, submission.type.indexOf('(') - 1);
    submission.keywords = submission.keywords.split(', ');
    submission.topics = submission.topics.split(', ');
    return submission;
  });
  return submissions;
}

// ====== Template & HTML serving functions ======

function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
