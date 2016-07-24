//
// Template.calendar.helpers({
//     calendar(){
//         let getDatee = new Date();
//         let monthe = getDatee.getMonth();
//         let yeare = getDatee.getFullYear();
//         let day = getDatee.getDate();
//
//         function isEmpty(val) {
//             return (val === undefined || val == null || val.length <= 0) ? true : false;
//         }
//
//         function prev() {
//             monthe = monthe - 1;
//             if (monthe < 0) {
//                 yeare = yeare - 1;
//                 monthe = 11;
//             }
//             dispCal(monthe, yeare);
//             return false;
//         }
//
//         function next() {
//             monthe = monthe + 1;
//             if (monthe > 11) {
//                 yeare = yeare + 1;
//                 monthe = 0;
//             }
//             dispCal(monthe, yeare);
//             return false;
//         }
//
//         function daysInMonth(monthe, yeare) {
//             return 32 - new Date(yeare, monthe, 32).getDate();
//         }
//
//         function getElementPosition(arrName, arrItem) {
//             for (var pos = 0; pos < arrName.length; pos++) {
//                 if (arrName[pos] == arrItem) {
//                     return pos;
//                 }
//             }
//         }
//
//         function setVal(getDat) {
//             $('#sel').val(getDat);
//             $('#calendar').hide();
//         }
//
//         function dispCal(mon, yea) {
//             var ar = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
//             var chkEmpty = isEmpty(mon);
//             var n, days, calendar, startDate, newYea, setvale, i;
//             if (chkEmpty != true) {
//                 mon = mon + 1;
//                 n = ar[mon - 1];
//                 n += " " + yea;
//                 newYea = yea;
//                 days = daysInMonth((mon - 1), yea);
//                 startDate = new Date(ar[mon - 1] + " 1" + "," + parseInt(yea));
//             } else {
//                 mon = getElementPosition(ar, ar[getDatee.getMonth()]);
//                 n = ar[getDatee.getMonth()];
//                 n += " " + yeare;
//                 newYea = yeare;
//                 days = daysInMonth(mon, yeare);
//                 startDate = new Date(ar[mon] + " 1" + "," + parseInt(yeare));
//             }
//
//             var startDay = startDate.getDay();
//             var startDay1 = startDay;
//             while (startDay > 0) {
//                 calendar += "<td></td>";
//                 startDay--;
//             }
//             i = 1;
//             while (i <= days) {
//                 if (startDay1 > 6) {
//                     startDay1 = 0;
//                     calendar += "</tr><tr>";
//                 }
//                 mon = monthe + 1;
//                 setvale = i + "," + n;
//                 if (i == day && newYea == yeare && mon == monthe) {
//                     calendar += "<td class='thisday' onclick='setVal(\"" + i + "-" + mon + "-" + newYea + "\")'>" + i + "</td>";
//                 } else {
//                     calendar += "<td class='thismon' onclick='setVal(\"" + i + "-" + mon + "-" + newYea + "\")'>" + i + "</td>";
//                 }
//                 startDay1++;
//                 i++;
//             }
//             calendar += "<td><a style='font-size: 9px; color: #efefef; font-family: arial; text-decoration: none;' href='http://www.hscripts.com'>&copy;h</a></td>";
//
//             $('#calendar').css('display', 'block');
//             $('#month').html(n);
//             var test = "<tr class='weekdays'><td>Sun</td><td>Mon</td><td>Tue</td><td>Wed</td><td>Thu</td><td>Fri</td><td>Sat</td></tr>";
//             test += calendar;
//             $('#dispDays').html(test);
//         }
//     }
// });