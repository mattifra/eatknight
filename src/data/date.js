let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();
const time = `${String(today.getHours())}:${String(today.getMinutes())}:${String(today.getSeconds())}`;
export default today = `${mm}/${dd}/${yyyy} ${time}`;