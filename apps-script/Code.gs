/**
 * 백선당 홈페이지 ↔ 구글시트 연동 (Apps Script 웹앱)
 *
 * 이 스크립트는 구글시트의 두 시트("주간메뉴", "메뉴판")를 읽어
 * 홈페이지가 사용할 JSON 으로 반환합니다.
 * 관리자는 코드를 만질 필요 없이 "구글시트만 수정"하면 됩니다.
 *
 * 설치/배포 방법은 같은 폴더의 README.md 를 참고하세요.
 */

// ── 시트 이름 (필요하면 여기만 바꾸세요) ──────────────
var SHEET_WEEKLY = '주간메뉴';
var SHEET_MENU = '메뉴판';

function doGet() {
  var out = {
    weekly: readWeekly(),
    menu: readMenu(),
    updatedAt: new Date().toISOString(),
  };
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/**
 * 시트를 헤더(첫 행) 기준으로 객체 배열로 변환.
 * 헤더 이름으로 값을 찾으므로 열 순서가 바뀌어도 동작합니다.
 */
function readSheet(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) return [];
  var values = sh.getDataRange().getValues();
  if (values.length < 2) return [];

  var headers = values[0].map(function (h) {
    return String(h).trim();
  });

  var rows = [];
  for (var r = 1; r < values.length; r++) {
    var row = values[r];
    // 완전히 빈 행은 건너뜀
    var hasValue = row.some(function (c) {
      return String(c).trim() !== '';
    });
    if (!hasValue) continue;

    var obj = {};
    for (var c = 0; c < headers.length; c++) {
      obj[headers[c]] = row[c];
    }
    rows.push(obj);
  }
  return rows;
}

function readWeekly() {
  return readSheet(SHEET_WEEKLY).map(function (r) {
    return {
      day: String(r['요일'] || '').trim(),
      date: String(r['날짜'] || '').trim(),
      title: String(r['대표메뉴'] || '').trim(),
      imageUrl: normalizeImage(String(r['이미지URL'] || r['이미지'] || '').trim()),
      items: splitItems(r['반찬'] || r['구성'] || ''),
      price: toNumber(r['가격']),
      soldOut: toBool(r['품절']),
    };
  });
}

function readMenu() {
  return readSheet(SHEET_MENU).map(function (r) {
    return {
      category: String(r['분류'] || '기타').trim(),
      name: String(r['메뉴명'] || r['메뉴'] || '').trim(),
      price: toNumber(r['가격']),
      desc: String(r['설명'] || '').trim(),
      signature: toBool(r['추천']),
    };
  });
}

// ── 헬퍼 ────────────────────────────────────────────
function splitItems(v) {
  if (Array.isArray(v)) return v;
  return String(v)
    .split(/[\n,·]/)
    .map(function (s) {
      return s.trim();
    })
    .filter(function (s) {
      return s.length > 0;
    });
}

function toNumber(v) {
  if (typeof v === 'number') return v;
  var n = Number(String(v).replace(/[^\d.-]/g, ''));
  return isNaN(n) ? 0 : n;
}

function toBool(v) {
  var s = String(v).trim().toLowerCase();
  return s === 'true' || s === 'y' || s === '예' || s === '품절' || s === 'o' || s === '1';
}

/**
 * 구글 드라이브 공유 링크를 이미지로 바로 쓸 수 있는 형태로 변환.
 * (예: https://drive.google.com/file/d/FILE_ID/view → thumbnail URL)
 * 그 외 일반 이미지 URL 은 그대로 반환.
 */
function normalizeImage(url) {
  if (!url) return '';
  var m = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (m) {
    return 'https://drive.google.com/thumbnail?id=' + m[1] + '&sz=w1000';
  }
  var m2 = url.match(/[?&]id=([^&]+)/);
  if (m2 && url.indexOf('drive.google.com') !== -1) {
    return 'https://drive.google.com/thumbnail?id=' + m2[1] + '&sz=w1000';
  }
  return url;
}
