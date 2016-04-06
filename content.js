var ALERT_WAIT_FOR_SUBMIT = 'The form has been submitted, please wait until it has completed before pressing any more buttons.';
var ALERT_TEXT_LIMIT = 'The text limit for this field has been reached. No more text may be added.';
var ALERT_NO_SEARCH = 'Starting over will mean that the system will not perform this search. Are you sure?';
var ALERT_TEXT_OVERFLOW = 'Text overflow';
var PREFER_24HOUR = '0';
var GMT_STR = 'GMT';
var AM_STR = 'AM';
var PM_STR = 'PM';
function isPageCompletelyLoaded()
{
  if (document.forms[0].PAGE_LOADED_FLAG.value != 'Y') {alert('The form has been submitted, please wait until it has completed before pressing any more buttons.'); return false;}
       return true;
}
function getSiteURL()
{
   return 'jcst';
}
function getLongRequestSiteURL()
{
   return '/LongRequest/jcst';
}
var gSessionWarningTimer = window.setInterval('SessionWarningTimer()', 60000);
var gTimerCount = 0;var canTimeout = true;var isSubmissionPage = false;
function getCurrentPage(){return 'ASSOCIATE_EDITOR_MANUSCRIPT_DETAILS';}

function stopTimeout()
{
	canTimeout = false;
}
function restartTimer()
{
   window.clearInterval(gSessionWarningTimer);
   gSessionWarningTimer = window.setInterval('SessionWarningTimer()', 60000);
}
function SessionWarningTimer()
{
   gTimerCount++;
   if ( gTimerCount == 168)
      if (canTimeout)
{ 
	showSessionWarning(true); 
}
}
var gSessionSaveTimer = window.setTimeout('SessionSave()', 10680000);
function SessionSave()
{
 if(canTimeout) { 
   if(false) { 
      var errorUrl = '';       if(window.parent != null && window.parent.frames != null && window.parent.frames.length > 0) {          window.parent.top.location = errorUrl;      } else {          window.location = errorUrl;      }    } else { 
      if(window.parent != null && window.parent.frames != null && window.parent.frames.length > 0) {         window.parent.top.setDataAndNextPage('NATURAL_TIMEOUT', 'true', 'LOGIN');
      } else {         setDataAndNextPage('NATURAL_TIMEOUT', 'true', 'LOGIN');
      }     } 
  }}
function getPostParams(){}

function popWindow(url,winname,width,height)
{
  winX=Math.round(screen.width/2)-(width/2);
  winY=Math.round(screen.height/2)-(height/2);
  winStats='toolbar=no,location=no,directories=no,menubar=no,resizable=yes,'
  winStats+='scrollbars=yes,width='+width+',height='+height
  if (navigator.appName.indexOf('Microsoft')>=0) {
    winStats+=',left='+winX+',top='+winY+''
  }else{ 
    winStats+=',screenX='+winX+',screenY='+winY+''
  }
  handle = window.open(encodeURI(url),winname,winStats) 
  if(handle != null)
  {
   if (winname != 'add_person_to_pick_pop' && winname != 'mssearch_issue_popup' && winname != 'progress_pop_report' && winname != 'progress_pop_large' && winname != 'progress_pop_large2' && winname != 'transfer_pop' && winname != 'email_popup_stay' && winname != 'forms_instructions_popup') 
   {
     addHandleToArray(handle);  
   }
   handle.focus();  
   handle.opener=self;  
  }
  if (winname == 'progress_pop_delayed' || winname == 'author_affil_details' || winname == 'sp_char_palette') 
    return handle;  
}
function popWindowSecure(url,winname,width,height)
{
  winX=Math.round(screen.width/2)-(width/2);
  winY=Math.round(screen.height/2)-(height/2);
  winStats='toolbar=no,location=no,directories=no,menubar=no,status=yes,resizable=yes,'
  winStats+='scrollbars=yes,width='+width+',height='+height
  if (navigator.appName.indexOf('Microsoft')>=0) {
    winStats+=',left='+winX+',top='+winY+''
  }else{ 
    winStats+=',screenX='+winX+',screenY='+winY+''
  }
  handle = window.open(url,winname,winStats) 
  if (winname != 'add_person_to_pick_pop' && winname != 'mssearch_issue_popup' && winname != 'progress_pop_report' && winname != 'progress_pop_large' && winname != 'progress_pop_large2' && winname != 'transfer_pop' && winname != 'email_popup_stay') 
    addHandleToArray(handle);  
  handle.focus();  
}
function popWindowSecureForPortal(url,winname,width,height)
{
  winX=Math.round(screen.width/2)-(width/2);
  winY=Math.round(screen.height/2)-(height/2);
  winStats='toolbar=yes,location=yes,directories=yes,menubar=yes,status=yes,resizable=yes,'
  winStats+='scrollbars=yes,width='+width+',height='+height
  if (navigator.appName.indexOf('Microsoft')>=0) {
    winStats+=',left='+winX+',top='+winY+''
  }else{ 
    winStats+=',screenX='+winX+',screenY='+winY+''
  }
  handle = window.open(url,winname,winStats) 
  if (winname != 'add_person_to_pick_pop' && winname != 'mssearch_issue_popup' && winname != 'progress_pop_report' && winname != 'progress_pop_large' && winname != 'progress_pop_large2' && winname != 'transfer_pop' && winname != 'email_popup_stay') 
    addHandleToArray(handle);  
  handle.focus();  
}
function showProgressWindow() { 
  javascript: popWindow('jcst\x3FPARAMS\x3Dxik_6AZTkNfyMp3SaNe1VnEa7fySEXLv39SKSteVumSpPcuuddXtdGZ47jpVnVsmAHPgJ8YXxF1Twk2bvmGRKejX8iZknJck7AWsNFtCvRY8Q6wejQKcdfuxZUbN7xRRemL2AXDFSmEPUKnMfKTt4aHfeZXufBuS8CbAKXmJfG6X6PZoLHrR1ajvYib8QYTpHqb2R1vU8tbvnnu7pPfH2oZvoEaRMUD6iMdy9k7ivAXuiLHD1KoS8R4LXTUUeXcikDQa34c51UdgBaH54kXEoHuzYvMQrGM5bSUxRgMm3nBTwvUM3BKoEn5PzWVXLXqL73XQQhFJCx8EJCG4VvxCzAWenmT9tJVFvc3e8t3eM6PbZ4kdht1spS65','progress_pop', 400, 300); 
}function showProgressWindowLarge(vPageName) { 
 showProgressWindowLarge(vPageName, 'progress_pop_large'); 
} 
function showProgressWindowLarge(vPageName, vPopupWindowName) { 
 if (vPopupWindowName == null) { vPopupWindowName = 'progress_pop_large'; } 
  javascript: popWindow('jcst\x3FPARAMS\x3Dxik_uVKTC5j9D2KtcPL8GCAME1hQdCDB486nvhnSY4LmsmAMJzTrQ52tuZfUgMSLQqUa7aMgZ6TAXEM7QXRoi598hHmRTS88Xj6oyPpyLaeBi4NWBPUH3cFKEWjV8r8WwAkBKcoa8LRXxrJRwy6C6YiGXptrkhgid5MHrzT5LQydYco7rbwAKAoetk2pdDCyKQzJRDqv9NYNC1jpVH78thE1S9F4KYMeSGj7DGfdWnfHuvRBQ4agcjMFDupHfVJobbAQSy7ypra69Lj6dgM6HAsQWg26DPnospWSzVSfFJ9CBarXhTC9WLDWY2KUvTSzY9CWWKWff4piYn3XTwhwVXL739dycd3zoGqEQEkrCNzdfXx9KnhzTYi&PAGE_NAME=' + vPageName + '', vPopupWindowName, 800, 600); 
}function showGenericProgressWindowLarge() { 
  javascript: popWindow('jcst\x3FPARAMS\x3Dxik_6AZTkNfyMp3SaNe1VnEa7fvBLuVTxYZNHefTggaGBX4AKT2gn33YEz7nMmGdbsPXAxMsET6E75gE6fStURG6Fr1TUHdupvHX7QMXQ8ZPXf9a1TeuPjkp5S3g12NdDAcqLAktrd9XLd1BZusFYg8dMhqRKPYPTjwEvH7cGZfsAroRfCxR3unTiKZ3r8RaxFUJkGrTi3mQjE6GYDGKL9AaWZiFUGcT2HEe4bfWnAaCMnBXbXdxhQDA8gNoTM1Ew7Cqm1HckFnYxDmn6HdkzEuyirMxybL6vPRTPswpvPiU6eW4teYi9M1L6GKS8vU2YgshBU3cnLg9j8skqCHSbHmAxvoXTgEkxAZryxnjTD7A2ZU93p61zQF4','progress_pop_large_generic', 800, 600); 
}function showProgressWindowForReport() {  javascript: popWindow('jcst\x3FPARAMS\x3Dxik_3pGfyDsLn4APmhBWQv7qyqmjVkwV31hCWggyVZLftM8MqMpTDgr5e3CcXRzZdHcYSSrzs182jX8T4Exsn1J6hWcf36rnpZ5bn5fdEYgYDRdELNps1H7GVcEG1EUJnvNt4PzyxJU35cPJ4Rmiajk4DwMSB4wjFfzwiRE7i9jr1mjC8BtNYKWQJ9WkBVDNeGMLivc23pvX9VcUfpX2zNjip5WUEAzZxNP4zQNN8UCDNGpFsUN95VSdmop5S31JVjFqwcmuvY8PYTaHXr7dDcUxzS9BNsq6yeVR7etkksHXAm5XCopcfSs7Se1spWjbK9Xfvh4B7uJA7LYaBmJQzjcx71cjvjnya1FhMjNvVhpo1Q4xTH2oX2yCSDFbPvRro49bXJUQcSzUGx','progress_pop_report', 600, 500); 
} 
function showProgressWindowForReportSwitchConfig(configId) {  javascript: popWindow('jcst\x3FPARAMS\x3Dxik_KTn9iehe3Ydq5o2FxWHtcDrQziBoq86HD3Ay3gh48zXxbqGASUrk1fNKZSehZx9ZppqZAEFUmXihkaHRpsXz6rDrtbtSe68pmuMCxBUXMYxzTpVNHLebbfoA1raSCEJiE8zGyxNp1XAfzFi4oiw2gW8SuWs3eoe8sQ6QFEuWL9QmSAMMgyJgLZoccBoGFz3BNtkGxEx8mjxwK6vSMG3Kd1oacat8BJmgmPiJ3skahpuFmiE4Pc1viRb4KXmu2D1Mt5hHWboVUe4YqGRXqzpqUDyWqdTRSVkpVVjHrb7RT3MxdFcBpaiNVm4w1GEoddv8oaFbXN3eDjNrLMKoYtyUJ2pdRfUMm3hTpSPz25Db2bMgZaJ2gYVRASg42VWhxrQ2QSAs4GRzd5kXvcbTaeZTo5NfSixvUa2NEJR3MT9jjxeb9nEKT8gBA','progress_pop_report', 600, 500); 
} 
function showProgressWindowRoleChange() {  javascript: popWindow('\x2FLongRequest\x2Fjcst\x3FPARAMS\x3Dxik_1GZHXnhqwKyNrVFRrfPY515DEpXMaruHeUjEi9yn6HQMTQ261EmtuuWzzfWNwEpdjxX2VfMVjAmBSWGpfcqvijE8iU7pm6yMd62YM5GNBR9WDg8myo9Xz5hDunfZVVEq9SSWbLuzgVkrxWW64QkbjS8qKevo569nDKVug1xQGDjp45yhCbvhFXf7AQuByFKrrHXDTZw2bfooeHT5bxZgdeaaAnuMqpm2EWmHP5zaBaXCR4UCEmCjaizDgQicoDmKEEPp5YPNruQAsShvsD7EnGLnKPYDVYDefxcFY7pSwvugcGKCAVspn88Y4rVYQZrvMzK6jCkNCzmcHxsRJoj1SEgCei5LLfSFVYwLD866N55oL1FJURkCTKV2wUJ7Mzw9PHr4SEGUQ','progress_pop_report', 800, 600); 
} 
function showProgressWindowMSListExport() {  javascript: popWindow('\x2FLongRequest\x2Fjcst\x3FPARAMS\x3Dxik_nTmUHaErs4TGUX4JSPvKUF8Cc4ucN6vZ4jxaRGb6bknuw2KDpgpz77yJcynLJNF8sDPbdAH26Q5CrbagQMqmnhiqfb3tbyfMWt23TDNNPH1zGXQqvjM5YxGSugXozXymEQoBexqdocS4i5g9MRHxqKen7Pqz8nCJd9yan82mq3A7T2Kb2CySmB7GiB2h3YpEAe5WyCcLbUDWUWAE8wJNtX4CGAoLNSgCixpVqfo1HxSQucgMS5o4qn7zgBbNak682vQ5bMm5aSf6uLyqnAERe2TN1pk9pSyxSfd9f1W71efdUp53tpzXVthJvgdPRCLu1Vpcqc6Kz1cib1Yit9S87sZvFcSzPt4iWSt4ZWUdRwdxb1xo8XqxGK1QoFEKKR6BLU9w9eT2v','progress_pop_report', 400, 300); 
} 
function showProgressWindowStubsListExport() {  javascript: popWindow('\x2FLongRequest\x2Fjcst\x3FPARAMS\x3Dxik_3YwpzavcQkedhzwKajRXUFNtMpaM1awPBhyH3AkGoNSMDjqouFY9M7yPCd8Bi79tCqqTyMmfVajvKq4TLwhqKux6JFxBSksauMZ2RK8FfcEUQC6r2kPFFTQEpjDKhS6CXxXrppuXpsFEsXZT8g9685irY2aBddLYDxXtKgU2UtsXVUcEAG436k6wkYsspfqBWe7gorq6nbfKptdZyPtvFSot75N2EtEknnGKytLL1HjwCEtGeHWGhJAxLnz4C8erXcCFHm6TA6S25hJakjZGm5CZ5CcQgQnaCgjEfqthh17yPXh3pLSCCNPDk7EAWuzZnspSCt1F29K6RBYhbMniKrVvRNuapqcdAptiFCkXK6dfTmoyTKi5RFHmboN2AGrZscbQy3GU6f','progress_pop_report', 400, 300); 
} 
function showProgressWindowMSListExportHistoryExport() {  javascript: popWindow('\x2FLongRequest\x2Fjcst\x3FPARAMS\x3Dxik_22G79Z7MTBihFybkmLyQSJruJmrnapnq14MunAcUzaEhKGgPdazbi7LgEDBPDCF14LdwTin3SdSf61MA7g2nsXbgh1PBs3SCQBRHoc7ZahSzKF8wmgcRhovK6AsopuEMsJxa3u5rPWGdiBUXytU58kVJGLWcfFpP88Qm1afE8zNdb3KGjGByvDsTUJMQZtpvZb8Kbxai7YbMoLsSueVRr2KmJ7vqMpBiB1PzA2UNaFFppsqNNnFccFDrK5gh9pnCqxFdGaPwpKK1UKHxMd9QFwkyznTFqCA8U45tsYhnmstSitK7m432cXACTA5RE3fU4ScBzyLjVSMfAm66efgRJDjZppgefwZETGt3dDzD4vmHmr9mQiMWFYg9Zerg7fNbiu4zpPnYEEXfiQRSksahatwMfYQFXwRS','progress_pop_report', 400, 300); 
} 
function showProgressWindowSimpleExportHistory() {  javascript: popWindow('\x2FLongRequest\x2Fjcst\x3FPARAMS\x3Dxik_Rp6XSiHwEg9ZT1dMbhDSMGTTD5U3zAHZDLe2haxZdfPc8qV7vLv6QiV7VKtsah8gx7QXZdJzakShYX4G9hS5uRLCRRWqczD4rgetn7xP5vVMyJfbPiAdsQQw92dvnmqPwbBNRxfJiggshe2Sg2QtHrDb1JbxvCS5HhduXUFGMub6xSVgoJtJENvFCWqrtoJEiQJ9j7vQyjG9CnjLg9bk8LdUkHbtA1SdsaoDFdhTipFWdAYW26YKqawcKU2W5pFeBxzQik5MwnnXABbuNQ3cpXPTfcFEgAF4pYivvjSZi98aixHtptCvaRwzX8jiF62hA1E4yvhxtq2BonQVPjDWnu7NZDeSa1EiJ46KpoLwirhejQQsz3wiJ3QSAXUvvLVdyrNeEQBCd','progress_pop_report', 400, 300); 
} 
function showProgressAsyncSearchResultsExport() {  javascript: popWindow('\x2FLongRequest\x2Fjcst\x3FPARAMS\x3Dxik_2f95uFL3pnbT6Kw3cyjMCWbBctFSQjCEAJmfwG3RmH9GYRCwSYDHfEsuk4QvdgLawvjBCJameBXZGw6s6PkDT4MfdvnQC1azqVH9NNg13gVMQJPh7faZ9LG1Suxq2UKH5jv5LEfM4C5KK2nx53ftnpmMpwu8bhVc592sAfNUT295dEV69xBhf92DDbkHEjtxNR972CSnHzYiyHn4Yi8f8JpyumVLgM6jFcH5SXahtkYa8uBJJk6VWYQ5Wp8vfJkHy9CqPVcnQnSQHmH1ZCfUVge2SyyBuLa5AxUaCgeW2rNHQgZucLcyKvTxxSBABwU9aqBr1f8TgFVGGkgzoXjhfPiYqcvscFHgWtaCtDzA54bhUbNNqNb3vePsmVJK6pDtkfzDZzG8ckLCRpEvCz1Dn4KKM5zsj2fU','progress_pop_report', 600, 500); 
} 
function showProgressWindowMSAddTasks() {  javascript: popWindow('\x2FLongRequest\x2Fjcst\x3FPARAMS\x3Dxik_msTW9HjBKnubyvLZKNoNjZ5HCkaa7YQanEMDPAGuVcmRUB5fuXaJH15Jzm3t1iF8qr416G1v2nmJrXVphXveEgNfDnvMAMe5rp1tvsFzrKWAVZviv78gxd7VFhCFRNthXHuF4dRC86bN6w3T5Vgi7FnEeiNUQfueaatPGpcpmfqjLjMZisThzszxv23duS2UVe4cq6Qb57siHgSQ8Nr74Jhe7uSr7UDkrKzuW91LGC48Z4oJcTHbbRwwEYt1rRRDiZzyaPrudvUuQHrRMLdwZHG7AHkV6eRLSTiaTXuUmz61co3cHUQr3CjkbBYdTizsxyQtXLbSKJpSWZCXE75StrDDo17FzAg5zy6cX3oCtRCaK4pcRTQ6SYBcp1HjaixMHwyYubLXT','progress_pop_report', 400, 300); 
} 
function showProgressWindowForIssueLineup(vRadioGroupName, vIssueId) {selVal = GetRadioValue(vRadioGroupName);if(selVal == '3') {javascript:setField('TAG_ACTION', 'EXPORT_ISSUE');  javascript: popWindow('jcst\x3FPARAMS\x3Dxik_2mv37YkAnzo5oXHbcL8mrj4KnywwKkvJCH8DbBJxqUHjVV68zSp8cYbkPnn62e8B82fpAyvUgUChEV8KPDvz8xURnm7bRYg4MvsAhnYjN43tWU5RaZhyijYwzXNWhtB7Dg9WE28496zYgzKGG58Yf8zixxLhtRcHDCuxrVSbFZPCHiTQRNw6RvHNFLRnkJNndoYDZgT2iSUvwNuokfnRXdPXK2SWYNGDLrw6KTc81qa78UbRRw1Qxi4JQZmtgdWx8b9BKSgEsRRT4QsuEZm9FJcSezDcrKLjaHB5fQJRqEzQ3L5ugppj2fQ8G9piaTA1YMP4d97DQT9khwigioDKJwJzg9qF41q2HfiJtr5sto3pfj77cnmgdmWswecyBgdzFfeF8hQ7r7QbvyG5KbLSnCHgH3rYukmg','progress_pop_report', 400, 300); 
} else {  javascript: showProgressWindowForReport();}} 
function showProgressWindowGeneric(vProgressTypeId) {  javascript: popWindow('jcst\x3FPARAMS\x3Dxik_8pxzrgMebgHhjdeccxecJYuw8NzWeW9HNw3xuyE2weZtzjDu5M4bTrXkvt5HSEA25kD7p4AWrpdEL1pEN6oz1oAditoQqTWNzUqASGcyaHyubGFxtssUWShoKS4ofoc7QeHnwwGmU9HmtXRk1wyeRMCwykP7RHckoBnKHoafWR3GzfVEdPMWWjVzSZ46Ut45hMQABZKJwfbuTFsoE3GNyoJ5iNERcwXPBriBvwbEToyshM3ZHEr8eBMquRkXUC4fzJ9sM5Jj1vp2oCree86U7dHatydNqZ3Fu3tLw4q2yyDT2VGhQzPn7NaovAwVnyzuyZFhd817N8ZsbDG1SQQRTPqeF17FKVXUthoGx1yYje7HCm3r3MNHwxXNRuiw3Es5AP5cui3E2','progress_pop_report', 400, 300); 
} 
function showProgressWindowForTransfer() {  javascript: popWindow('jcst\x3FPARAMS\x3Dxik_2SB2FBpkD39pVTxEULxEaqy11FceDfAsvYCXezetu8WeEKE3xyg6QVbF3D6hJqkLwJ3eRwdyx2SMuRYE5BBs3otX6L7RSJCjoyQ6ctAxfWSfztzS6aesR9nH9SYmxFEZ5FJDf4sLDXiysr4u1jVyGcwU4reULZjhSM8xzs2QPU9RHfmvdfwbUPyWjEFHtNwuLW9vLr68sKkGBkn9oxWoN6Uy3U1Lf8eBiznLxbBvqMhL9qh3ZQwCJpUEXKRTsE3cR2BNbob851ZHA5GcU1GW5osnMMXM2jzytf9BeYM8ZbGXCCXR29r47xDTtcGATGw4YKmczLeeWqJjf6pc2ayQpe2cpFVZ9oNXTngMxnHipgnxJj3yx1eY6iXdETn7EkedwptsGgreMY','transfer_pop', 400, 300); 
} 
function showProgressWindowForIssueTransfer() {  javascript: popWindow('jcst\x3FPARAMS\x3Dxik_RS6k9hUYBEBhD9KSitm2sFXZUFxcveWqmY3AUG78oafn8UCC8HaYEc6bf7LLHZSgGzHUh1Z6cp6Dh2fN9e3KLFX5xKdJjLrxqsaMcrEBCbhNk8YN6gufQw3V7gsQj7vApUir7s5ecAvPRCr23gcMSUp8bY25CwZ4YmBS3HSdieKy6QLwNqEvc2Jwy7R6mBCiUEdfXTCxTHNXB1DY1JqysxaafoBzp4V7sfSuMvL63jPW8zgpFeBfdQWS8dgTmcHkhDuRjFwGJjeAxQrKVNdiu5hhQL8KT4VQjqjUAwZSXBpQ3cWfT7xkCQ9EhoFycPuutiUponioPK6R2SXWCeHqPktDEorNELp8BWn9Ms8oBRm6Mqzc4LyC6edCSzQYPu66uEtHyXSCnKYpi6zZPoUecBWDWYuxgBZCDewP1u3KAjDLhC1KFw13i','transfer_pop', 400, 300); 
} 
function showProgressWindowForImport() {  javascript: popWindow('jcst\x3FPARAMS\x3Dxik_3pGfyDsLn4APmhBWQv7qyqmjVkwV31hCWggyVZLftM8MqMpTDgr5e3CcXRzZdHcYSSrzs182jX8T4Exsn1J6hWcf8Sb4edLCktqftkQdZPVurTnPynbujbhQhZqzeUxMuSkib1DnhYsw7CzuhVrEPsvr6Nme1rcKMpLEBkWwkjW3YSpZxNHrtbB45LGJ11t8AjB9GxtqKUkZ97koifDCVTnpxgKskYeRa4a1Uy1MWf9Ve25VPUCdcfzrJEZWSGRH13WgYeJY3sQvLHd5uNQdBNqdcm1xJCAA71X19pCG7kXyKq1RQuTL2Vf6vjSWva4RvS1gUkPdYfdrYyNkeF2K6zrMJB4T3YCFuWxtmNCGDEEyKzTefNcvbHBoSeEC6rpiZSShPFHyBi','progress_pop_report', 600, 500); 
} 
function showProgressWindowArXiv() { 
  javascript: popWindow('jcst\x3FPARAMS\x3Dxik_2SB2FBpkD39pVTxEULxEaqss7uT4M4fRfaM2ChEouKHAGA32DTcKA4nD1D31sYMvAypfd5daYYev1ua62URBL1kYUpXjTmbHfvnmZgrVaQNrQCfdgMCYL4AACaUY1RHF5BTPuej4k64prK7WTDsfmN9dNAf1AmAK2ybdtJjCj7fNj56XHNF92oLdbSt4oobcniVwsWLRYMy6H1qgGtEVDBagFjjVV2rQEZ8B2AFArjywU6PfZQvWVQeEE85SZDJVhHKEDuLz53HmZukCEDHoy9TVBvNkAv6N2jgFh9zShtiWG4XHJ1nx4BE5qwkfBSDDHdvx1zVD4mGhXqUGPum9h4BRwxf5mdMJpofhfZzwACVYhR72DVnEsTWonoGPbQFN617GV175kg','progress_pop_large', 800, 600); 
}function checkForSomethingToUpload()
{ 
  var i=0; 
  var existsFl = 0; 
  for (i=0;i<20;i++) { 
    var metaArray = document.getElementsByName('FILE_TO_UPLOAD'+i); 
    if (metaArray.length == 1) { 
     var filename = document.forms[0]['FILE_TO_UPLOAD'+i].value; 
     if (filename.length > 0) 
       existsFl = 1; 
   } 
  } 
  for (i=0;i<20;i++) { 
    var metaArray = document.getElementsByName('ZIP_FILE_TO_UPLOAD'+i); 
    if (metaArray.length == 1) { 
     var filename = document.forms[0]['ZIP_FILE_TO_UPLOAD'+i].value; 
     if (filename.length > 0) 
       existsFl = 1; 
   } 
  } 
  if (existsFl == 1) { return true; }  
  return false; 
}
function checkForDuplicateFiles()
{ 
  var i=0; 
  var j=0; 
  var existsFileFl = 0; 
  var filename1 = '';
  var filename2 = '';
  var noOfFiles = 0;
  noOfFiles =  document.getElementById('HIDDEN_VALUE_FOR_FILENO').value; 
  for (i=0;i<noOfFiles && existsFileFl != 1;i++){
     filename1 = document.forms[0]['FILE_TO_UPLOAD'+i].value; 
     filename1 = trimAll(filename1.substring(filename1.lastIndexOf('\\')+1));     for(j=i+1; j<noOfFiles && existsFileFl != 1;j++){ 
       filename2 = document.forms[0]['FILE_TO_UPLOAD'+j].value; 
       filename2 = trimAll(filename2.substring(filename2.lastIndexOf('\\')+1));       if(filename1!='' && filename1==filename2) existsFileFl = 1; } } 
  if (existsFileFl == 1) { alert ('A file named \'' + filename1 + '\' is already present for uploading for this manuscript. If you want to upload this file (e.g. this is a replacement for an existing file) you must rename the new file and then upload it.'); resetIsOk(); return false; }  
  return true; 
}
function checkUploadFields()
{ 
   if(window.parent != null && window.parent.frames != null && window.parent.frames.length > 0) { 
		return checkUploadFieldsLocal(); 
   }   
  return true; 
}
function checkUploadFieldsLocal()
{ 
  return true; 
}

String.prototype.endsWith = function(str) 
{ 
  var lastIndex = this.lastIndexOf(str); 
  return (lastIndex != -1) && (lastIndex + str.length == this.length); 
} 

function checkForRestrictedFileTypes()
{ 
   if(window.parent != null && window.parent.frames != null && window.parent.frames.length > 0) { 
		return checkForRestrictedFileTypesLocal();  
	} 
  var i=0; 
  var badExtFl = 0; 
     var isDocxFile = 0; 
     var isDocXRestricted = 0; 
     var isDocExtFLRestricted = 0; 
  for (i=0;i<20;i++) { 
    var metaArray = document.getElementsByName('FILE_TO_UPLOAD'+i); 
    if (metaArray.length == 1) { 
     var filename = document.forms[0]['FILE_TO_UPLOAD'+i].value; 
    if (filename.toUpperCase().endsWith('.SHS') > 0) badExtFl = 1; 
    if (filename.toUpperCase().endsWith('.EXE') > 0) badExtFl = 1; 
    if (filename.toUpperCase().endsWith('.COM') > 0) badExtFl = 1; 
    if (filename.toUpperCase().endsWith('.VBS') > 0) badExtFl = 1; 
    if (filename.toUpperCase().endsWith('.ZIP') > 0) badExtFl = 1; 
    if (filename.toUpperCase().endsWith('.TEX') > 0) badExtFl = 1; 
    if (filename.toUpperCase().endsWith('.CTX') > 0) badExtFl = 1; 
    if (filename.toUpperCase().indexOf('.DOCX') > 0) isDocxFile = 1; 
   } 
  } 
  if (badExtFl == 1 || isDocExtFLRestricted == 1) { if (confirm('You are attempting to upload a restricted file type. Are you sure you wish to continue?'))  return true; else return false; }  
  if (isDocExtFLRestricted == 1) { alert ('You have attempted to upload a restricted file type. Please review the instructions and upload again. Restricted file extensions include:  '); return false; }  
  var hasZipFilesFl = false;
  var goodZIPExtensionFl = false;
  for (i=0;i<20;i++) { 
    var metaArray = document.getElementsByName('ZIP_FILE_TO_UPLOAD'+i); 
    if (metaArray.length == 1) { 
     var filename = document.forms[0]['ZIP_FILE_TO_UPLOAD'+i].value; 
     if (filename != null && filename.length > 0) hasZipFilesFl = true; 
     if (filename != null && filename.length > 0 && filename.toUpperCase().endsWith('.ZIP')) goodZIPExtensionFl = true; 
     if (filename != null && filename.length > 0 && filename.toUpperCase().endsWith('.TAR')) goodZIPExtensionFl = true; 
     if (filename != null && filename.length > 0 && filename.toUpperCase().endsWith('.GZ')) goodZIPExtensionFl = true; 
     if (filename != null && filename.length > 0 && filename.toUpperCase().endsWith('.TAR.GZ')) goodZIPExtensionFl = true; 
     if (filename != null && filename.length > 0 && filename.toUpperCase().endsWith('.TGZ')) goodZIPExtensionFl = true; 
    } 
    if (hasZipFilesFl && !goodZIPExtensionFl) { alert ('Sorry, you may only upload compressed files here. Please review the instructions and upload again. Allowed file extensions include: zip;tar;gz;tar.gz;tgz'); return false; }  
  } 
  return true; 
}
function checkForRestrictedFileTypesLocal()
{ 
  var i=0; 
  var badExtFl = 0; 
     var isDocxFile = 0; 
     var isDocXRestricted = 0; 
  for (i=0;i<20;i++) { 
    var metaArray = document.getElementsByName('FILE_TO_UPLOAD'+i); 
    if (metaArray.length == 1) { 
 var formObject = document.getElementById('file_upload_form_'+i);  if(formObject != null) {  var filename = formObject['FILE_TO_UPLOAD'+i].value;      if (filename.toUpperCase().endsWith('.SHS') > 0) badExtFl = 1; 
    if (filename.toUpperCase().endsWith('.EXE') > 0) badExtFl = 1; 
    if (filename.toUpperCase().endsWith('.COM') > 0) badExtFl = 1; 
    if (filename.toUpperCase().endsWith('.VBS') > 0) badExtFl = 1; 
    if (filename.toUpperCase().endsWith('.ZIP') > 0) badExtFl = 1; 
    if (filename.toUpperCase().endsWith('.TEX') > 0) badExtFl = 1; 
    if (filename.toUpperCase().endsWith('.CTX') > 0) badExtFl = 1; 
    if (filename.toUpperCase().indexOf('.DOCX') > 0) isDocxFile = 1; 
    } 
   } 
  } 
  if (badExtFl == 1) { if (confirm('You are attempting to upload a restricted file type. Are you sure you wish to continue?'))  return true; else return false; }  
  return true; 
}

function checkForRestrictedFileTypesWithControlName(controlName)
{
  var badExtFl = 0; 
  var metaArray = document.getElementsByName(controlName); 
  if (metaArray.length == 1) { 
   var filename = document.forms[0][controlName].value; 
  if (filename.toUpperCase().endsWith('.SHS') > 0) badExtFl = 1; 
  if (filename.toUpperCase().endsWith('.EXE') > 0) badExtFl = 1; 
  if (filename.toUpperCase().endsWith('.COM') > 0) badExtFl = 1; 
  if (filename.toUpperCase().endsWith('.VBS') > 0) badExtFl = 1; 
  if (filename.toUpperCase().endsWith('.ZIP') > 0) badExtFl = 1; 
  if (filename.toUpperCase().endsWith('.TEX') > 0) badExtFl = 1; 
  if (filename.toUpperCase().endsWith('.CTX') > 0) badExtFl = 1; 
  } 
  if (badExtFl == 1) { alert ('You have attempted to upload a restricted file type. Please review the instructions and upload again. Restricted file extensions include:  SHS EXE COM VBS ZIP TEX CTX '); return false; }  
  return true; 
}
function checkForAllowedFileTypes()
{ 
   if(window.parent != null && window.parent.frames != null && window.parent.frames.length > 0) { 		return checkForAllowedFileTypesLocal();	
   }	
  return true; 
}
function checkForAllowedFileTypesLocal()
{ 
  return true; 
}

function endsWith(str, suffix) {
return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function showProgressWindowUserListExport() {  javascript: popWindow('\x2FLongRequest\x2Fjcst\x3FPARAMS\x3Dxik_Rp6XSiHwEg9ZT1dMbhDSMJhe78VZGx8tf5RiKEGY7ZoKaR83ZZY5eZkLq1q2pLAjF4k26xhkqi9ZhbqTZxgKYmfEa4ceZp7L6vSF9v7kUXkYydfdcmcNyxT2UsTdAZHiGfqwW4c9UKJ2P6GmmwZpsPqXgWzLKaRHX9JqJMZMhGZpHSVDY36S7SXacymhvbSR9fEcqXigpY85aNNEVpZZV7zb53kjnvzZJweJrSQ1V83sP7FsiTFaaEv5mvsKTjBThYQDL9MEfjVcvJBRkCvYX7sSzhRpjXb8CTDxmXUDtNZ5L2rKmqFdTcGDt7d9TCEiLKFs5sQDZ7LGbD8cFPnqwTPryJBFMtHzoWGTiZP2mMFj8PY3oYs4ikfokomfUBevTUJXhPDnW','progress_pop_report', 400, 300); 
} 
function showProgressWindowUPlagiarismDocExport() {  javascript: popWindow('\x2FLongRequest\x2Fjcst\x3FPARAMS\x3Dxik_3dFb4GaDM1KtxGUp1tjhr7f4TWd46d8A4KHHCtoUheqFimMpUutqtLoDLSTLUXcXkYtZUFTvRHo7ZU3SZi7Xvm65SfCy5yvpmm2q7k8kSnmVceGtJTmbbBqpzaCAf1Wt6W2gaRwMVajhrV7r8LAtWBmMhb9Qde1J9KFEYdUua1xJ3Q2pKaX4wrw72M44dvxAv21ny1xY9E8zG6VZ4EDDkKYP8A8VKZ4fJBXCERAQRJ9EkkVjxcxrBfsXyytFe7EPa48RF5WZpAcSmWKmBgWkt88yEnVGmJnEHVoA79rUGD1kcD7UjZvPELLprvgeHLn2wp6PrdRAD7CUYWsqn89Lz5KVePM6ADN3DqqYb7VLPnkahUCansNVJiNRNtiGAQkx96bNDMS94t','progress_pop_report', 400, 300); 
} 
function showProgressWindowRevExport() {  var assigneeRoleId = document.forms[0].ASSIGNEE_ROLE_ID.value;  var docTaskId = document.forms[0].DOCUMENT_TASK_ID.value;  popWindow("/LongRequest/jcst?PARAMS=xik_4GSNtPYqMLGuDeUQqkBL6RiD4g64W5mNEb699AFDwJbKL2kkzjsLkiv5SbF6qJdznjFuR2V4WeJm13nzDhSYxi63o8CK98CNojaZ8nQFxatKs4HuSXphvmBbq8ZrCGnDQk2cD29x3ujQfjsdsfbbeokZY7WGGJMa9MBup13jFmPWje2bsH3fbTNYJokMFcTZVCVoTnC7GjyZb6SQbL2b34ZKgSNDPBhJDXYA4JTy8spMFEspZUFcoEp2uoWsYGSw5UzapJYwcAKhe1VZocELJC4U8NJ89NH4sg1FV5pqPVLpoicg8HxhK66cXDT9F7tiBDbVSGL8REfCtJgiRBuVyTLUQ8sSLA4DsrbmLFfhaxWhmx3G3TbsxLrxesWHqrkaUCiTfv5Fnh&ASSIGNEE_ROLE_ID=" + assigneeRoleId + "&DOCUMENT_TASK_ID=" + docTaskId,"progress_pop_report", 480, 400); 
} 
function showProgressWindowEmailTagsListExport() {  javascript: popWindow('\x2FLongRequest\x2Fjcst\x3FPARAMS\x3Dxik_4DY1txjTQzT8uNRZUNf5rmSz4cDbndd1wTVavEcy6Y9kHRjJUkPW8D1ATUAFJU6xeCbFc6jao9h1JW51LAoiHfVgCvLyAX5gDGhuT1bs7nVrtJHAKa3BqW6QmQVF1Jfvu4hnd3nr88Xv3dQeg1qi11Vm2LkWc3Y6TiVdcr3iSTBxLrFTFs5u9pDvocSVKpeQXJuh4BbjQyoe1a4MaCmPoun2D9e4MeMUXfmpqWn1srXpcW5FiUyJ235XuaNB6bZQynfF7VZcZWZeBYWstV1aQHXMWmVXcqsLNQiHpKkErctsEM1ZJHmS1uoMUSBwWFnDDvL3GiS4UMDde6KtUtiwRbsCpRbvaapC8P3boPWbagYJ6tz5Myvsr3QwC4DfLNLhm4aWi9F84u','progress_pop_report', 400, 300); 
} 

var emailWindows = new Array();
var emailWindowNames = new Array();
var checkEmailWindowsCalled = false;
function registerEmailWindow(emailWindow)
{ 
   emailWindows[emailWindows.length] = emailWindow;
   if(emailWindowNames.toString().indexOf(emailWindow.name)==-1)
   { 
       emailWindowNames[emailWindowNames.length] = emailWindow.name;
   }
   if(document.forms[0].OPEN_EMAIL_WINDOWS!=null)
   { 
       document.forms[0].OPEN_EMAIL_WINDOWS.value = emailWindowNames.toString();
   }
} 

function checkEmailWindows()
{
if(!checkEmailWindowsCalled)
{
   var blPopupsOpen=false;
   if(true)
   { 
     if(document.forms[0].NEXT_PAGE.value.indexOf("MANUSCRIPT_DETAILS")==-1 || (document.forms[0].NEXT_PAGE.value.indexOf("MANUSCRIPT_DETAILS")!=-1 && document.forms[0].NEXT_PREV_DOCUMENT_ID!=null && document.forms[0].NEXT_PREV_DOCUMENT_ID.value!="" && document.forms[0].DOCUMENT_ID.value != document.forms[0].NEXT_PREV_DOCUMENT_ID.value) || (document.forms[0].NEXT_PAGE.value.indexOf("MANUSCRIPT_DETAILS")!=-1 && document.forms[0].PRE_ACTION != null && document.forms[0].PRE_ACTION.value=="PERFORM_HEADER_QUICK_SEARCH" )|| (document.forms[0].NEXT_PAGE.value.indexOf("MANUSCRIPT_DETAILS")!=-1 && document.forms[0].PROXY_TO_ROLE_ID != null && document.forms[0].PROXY_TO_ROLE_ID.value != '' ))
     { 
       emailWindows.length=0;
       for(var i = 0; i<emailWindowNames.length; i++)
       {
           emailWindowName = emailWindowNames[i];
           if (typeof emailWindowName != 'undefined' && emailWindowName != '')
           { 
               var winHandle=window.open('',emailWindowName);
               if(typeof winHandle.frames['mainemailwindow'] != 'undefined' && winHandle.frames['mainemailwindow'] != null)
               {
                   registerEmailWindow(winHandle);
               }
               else
               {
                   winHandle.close();
               }
           }
       }
       if(emailWindows.length > 0)
       { 
           for(var i = 0; i<emailWindows.length; i++)
           {
               if(!emailWindows[i].closed)
               {
                   blPopupsOpen=true;
                   break;
               }
           }
           if(!blPopupsOpen)
           { 
               checkEmailWindowsCalled=true;
               return true;
           }
           if(confirm ('We have detected that there is at least one e-mail window open - these windows will be closed when you move from the details of one manuscript to another. If you would like to retain this text for use later, please click the "Cancel" button and complete or save the e-mails for future reference. \nContinue?'))
           { 
               for(var i = 0; i<emailWindows.length; i++)
               {
                   if(!emailWindows[i].closed)
                   {
                       unRegisterWindow(emailWindows[i].name);
                       emailWindows[i].close();
                   }
               }
               checkEmailWindowsCalled=true;
               return true;
           }
           else
           { 
               if(document.forms[0].NEXT_PREV_DOCUMENT_ID!=null){document.forms[0].NEXT_PREV_DOCUMENT_ID.value='';}
               if(document.forms[0].PRE_ACTION!=null){document.forms[0].PRE_ACTION.value='';}
               if(document.forms[0].PROXY_TO_ROLE_ID!=null){document.forms[0].PROXY_TO_ROLE_ID.value='';}
               if(document.forms[0].CLEAR_SEARCH!=null){document.forms[0].CLEAR_SEARCH.value='';}
               return false;
           }
       }
       else
       { 
           checkEmailWindowsCalled=true;
           return true;
       }
     }
     else
     { 
       checkEmailWindowsCalled=true;
       return true;
     }
   }
   else
   {
       checkEmailWindowsCalled=true;
       return true;
   }
}
else
{ 
   checkEmailWindowsCalled=true;
   return true;
}
}

function getOpenEmailWindows()
{ 
   if(document.forms[0].OPEN_EMAIL_WINDOWS!=null)
   { 
       return document.forms[0].OPEN_EMAIL_WINDOWS.value;
   }
   else
   { 
       return '';
   }
} 

function registerEmailWindowByName(emailWindowName)
{ 
 if (typeof emailWindowName != 'undefined')
 { 
   if(emailWindowNames.toString().indexOf(emailWindowName)==-1)
   { 
       emailWindowNames[emailWindowNames.length] = emailWindowName;
   }
   if(document.forms[0].OPEN_EMAIL_WINDOWS!=null)
   { 
       document.forms[0].OPEN_EMAIL_WINDOWS.value = emailWindowNames.toString(); 
   }
 } 
} 

function unRegisterWindow(emailWindowName)
{ 
  var newEmailWinNames = new Array(); 
  for(var i = 0, j=0; i<emailWindowNames.length; i++)
  {
   if(emailWindowNames[i]!=emailWindowName)
   { 
      if(typeof emailWindowNames[i] != 'undefined' && emailWindowNames[i]!='')
      { 
         newEmailWinNames[j] = emailWindowNames[i];
         j++;
      }
   }
  }
  emailWindowNames.length=0;
  emailWindowNames=newEmailWinNames;
  if(document.forms[0].OPEN_EMAIL_WINDOWS!=null)
  { 
      document.forms[0].OPEN_EMAIL_WINDOWS.value = emailWindowNames.toString();
  }
} 

function showProgressWindowPermissionAuditTrailExport() {  javascript: popWindow('\x2FLongRequest\x2Fjcst\x3FPARAMS\x3Dxik_2XiGtUzWEaAqZJJJAuSYEUyQbJXUEd5Z5BtRY3cxhmvTBT3Ygx4LJMRvKRQtAm4yq8omjcSGjPsznecvoXq3whsGRFYqRUb6ajqukhnz9BFbt5kgjn7GG5829C8gg13dP7xrurZqfwqeVsU5s8LsS2HDS2jkSAvgEWNPxJzqDNkQSMNc7PxJCLD6C2od1A8FHxTHcTQRBFz46QUCJEGcUcgtsiEQwjW2QezXhWFDWTtjoLgL3nsEWBZJgrPSv8QfP8MAjtHDcviJP2UxNQpj3qexdMjbFsGy3omFgRUBJFobo8UDAMcUBgGRbCqAcUsobdxJ1HZ3aZV4UnMfX6QvLWNkXLTc9vwnCkRF2TiZHnwH9DvyReQRK2vvxdeNzksbXRcBAo2BANwp9Js682nHWUR66WvmTGSx','progress_pop_report', 400, 300); 
} 
function showProgressWindowSubmissionStatisticsExportCSV() {  javascript: popWindow('\x2FLongRequest\x2Fjcst\x3FPARAMS\x3Dxik_btuVmsJqLgqjUb2dJgZkQK7nMHWBRjm2a9DhBpx76irXwJKa7cfjWmPwmGe5bxqFGasuwcpawqGY964k1uoqLtnegUimJnMHgV99T1hoJoGomKP6GtonpkW46PZpbZY8fnyEAV7yLKMxymKc22RRmX8ZFZdiAYyDGABiriQ25Ae8sKWnvWiapVuxkgNSZzXUozxoSAFgJNwuZwd6eYiu1PYZLF2o6HnYe1rB2jgHdPoicd4LQZkhASxg7hCgS4PpvZEt1VBPXUNg39FTHJH1LwQxe5WJdLdjeA1nfAq4KeDq9XrHg3YFaaJai26q3JNqFqwJpcP1QZFhc2MXmiL33X1XFgEFdWXxNt4JWinu5iiT5shpzrEKSQH5BJJqHv3w3wwr7Bd4s','progress_pop_report', 400, 300); 
} 
