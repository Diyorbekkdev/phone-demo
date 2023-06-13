const unicodePrivateStart = 0xe000; //'\uE000';

const tagPattern = /<.+?>/g;
const urlPattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[а-џA-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[а-џA-Za-z0-9.-]+)((?:\/[\+~%\/.\w_-]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/giu;

function getIgnoreList(tx, regexArray) {
  
  var tagList = [];

  for (var regex of regexArray)
    if (regex.test(tx))
      tagList = tagList.concat(tx.match(regex));
  
  if (tagList.length == 0) return null;

  // remove duplicates via converting to Set object and back
  tagList = Array.from(new Set(tagList));

  var frObj = [];
  var i=0;
  for (const tag of tagList)
    frObj.push({
      src: tag,
      dst: String.fromCharCode(unicodePrivateStart + i++)
    });

  return frObj;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function replaceAll(str, term, replacement) {
  return str.replace(new RegExp(escapeRegExp(term), "g"), replacement);
}


function lat2cir(text) {
    text = " "+text;  
    text = text
        .replace(/A/g, 'А')
        .replace(/B/g, 'Б')
        .replace(/V/g, 'В')
        .replace(/G/g, 'Г')
        .replace(/D/g, 'Д')
        .replace(/Đ/g, 'Ђ')
        .replace(/E/g, 'Е')
        .replace(/Ž/g, 'Ж')
        .replace(/Z/g, 'З')
        .replace(/I/g, 'И')
        .replace(/J/g, 'Ј')
        .replace(/K/g, 'К')
        .replace(/L/g, 'Л')
        .replace(/M/g, 'М')
        .replace(/N/g, 'Н')
        .replace(/O/g, 'О')
        .replace(/P/g, 'П')
        .replace(/R/g, 'Р')
        .replace(/S/g, 'С')
        .replace(/T/g, 'Т')
        .replace(/Ć/g, 'Ћ')
        .replace(/U/g, 'У')
        .replace(/F/g, 'Ф')
        .replace(/H/g, 'Х')
        .replace(/C/g, 'Ц')
        .replace(/Č/g, 'Ч')
        .replace(/Š/g, 'Ш')
        .replace(/a/g, 'а')
        .replace(/b/g, 'б')
        .replace(/v/g, 'в')
        .replace(/g/g, 'г')
        .replace(/d/g, 'д')
        .replace(/đ/g, 'ђ')
        .replace(/e/g, 'е')
        .replace(/ž/g, 'ж')
        .replace(/z/g, 'з')
        .replace(/i/g, 'и')
        .replace(/j/g, 'ј')
        .replace(/k/g, 'к')
        .replace(/l/g, 'л')
        .replace(/m/g, 'м')
        .replace(/n/g, 'н')
        .replace(/o/g, 'о')
        .replace(/p/g, 'п')
        .replace(/r/g, 'р')
        .replace(/s/g, 'с')
        .replace(/t/g, 'т')
        .replace(/ć/g, 'ћ')
        .replace(/u/g, 'у')
        .replace(/f/g, 'ф')
        .replace(/h/g, 'х')
        .replace(/c/g, 'ц')
        .replace(/č/g, 'ч')
        .replace(/š/g, 'ш')
        .replace(/Л[Јј]/g, 'Љ') //.replace(/Лј/g, 'Љ')
        .replace(/лј/g, 'љ')
        .replace(/Н[Јј]/g, 'Њ') //.replace(/Нј/g, 'Њ')
        .replace(/нј/g, 'њ')
        .replace(/Д[Жж]/g, 'Џ') //.replace(/Дж/g, 'Џ')
        .replace(/дж/g, 'џ');

    // Specijalni slučajevi
    text = text
      // њ => нј.
      .replace(/(\s[Аа]|\s[Ии]|[Вв][Аа]|[Оо])њ([Ее][Кк]|[Ее][Зз]|[Оо][Нн]|[Уу][ГгНн])/g, '$1нј$2')
      .replace(/([^Кк][Аа]|[Ии]|[Вв][Аа]|[Оо])Њ([Ее][Кк]|[Ее][Зз]|[Оо][Нн]|[Уу][ГгНн])/g, '$1НЈ$2')
      // џ -> дж
      .replace(/([Пп][Оо]|[Нн][Аа]|[Оо]|[Пп][Рр][Ее]|[Фф][Ее][Лл])џ([Уу][ТтРр]|[Вв]|[Њњ]|[Ии][Вв]|[Уу][Пп]|[Аа][НнЛл][^Кк]|[Ее][Тт]|[Ее][Лл])/g, '$1дж$2')
      .replace(/([Пп][Оо]|[Нн][Аа]|[Оо]|[Пп][Рр][Ее]|[Фф][Ее][Лл])Џ([Уу][ТтРр]|[Вв]|[Њњ]|[Ии][Вв]|[Уу][Пп]|[Аа][НнЛл][^Кк]|[Ее][Тт]|[Ее][Лл])/g, '$1ДЖ$2')
  
    ;

  // ToDo: ispravi velika/mala slova u Lj, Nj, Dž
    return text.trim();  

}

function cir2lat(text){
    text = text
        .replace(/А/g, 'A')
        .replace(/Б/g, 'B')
        .replace(/В/g, 'V')
        .replace(/Г/g, 'G')
        .replace(/Д/g, 'D')
        .replace(/Ђ/g, 'Đ')
        .replace(/Е/g, 'E')
        .replace(/Ж/g, 'Ž')
        .replace(/З/g, 'Z')
        .replace(/И/g, 'I')
        .replace(/Ј/g, 'J')
        .replace(/К/g, 'K')
        .replace(/Л/g, 'L')
        // lowercase cyrillic range
        .replace(/Љ([\u0430-\u045f])/g, 'Lj$1')
        .replace(/Љ/g, 'LJ')
        .replace(/М/g, 'M')
        .replace(/Н/g, 'N')
        // lowercase cyrillic range
        .replace(/Њ([\u0430-\u045f])/g, 'Nj$1')
        .replace(/Њ/g, 'NЈ')
        .replace(/О/g, 'O')
        .replace(/П/g, 'P')
        .replace(/Р/g, 'R')
        .replace(/С/g, 'S')
        .replace(/Т/g, 'T')
        .replace(/Ћ/g, 'Ć')
        .replace(/У/g, 'U')
        .replace(/Ф/g, 'F')
        .replace(/Х/g, 'H')
        .replace(/Ц/g, 'C')
        .replace(/Ч/g, 'Č')
        // lowercase cyrillic range
        .replace(/Џ([\u0430-\u045f])/g, 'Dž$1')
        .replace(/Џ/g, 'DŽ')
        .replace(/Ш/g, 'Š')
        .replace(/а/g, 'a')
        .replace(/б/g, 'b')
        .replace(/в/g, 'v')
        .replace(/г/g, 'g')
        .replace(/д/g, 'd')
        .replace(/ђ/g, 'đ')
        .replace(/е/g, 'e')
        .replace(/ж/g, 'ž')
        .replace(/з/g, 'z')
        .replace(/и/g, 'i')
        .replace(/ј/g, 'j')
        .replace(/к/g, 'k')
        .replace(/л/g, 'l')
        .replace(/љ/g, 'lj')
        .replace(/м/g, 'm')
        .replace(/н/g, 'n')
        .replace(/њ/g, 'nj')
        .replace(/о/g, 'o')
        .replace(/п/g, 'p')
        .replace(/р/g, 'r')
        .replace(/с/g, 's')
        .replace(/т/g, 't')
        .replace(/ћ/g, 'ć')
        .replace(/у/g, 'u')
        .replace(/ф/g, 'f')
        .replace(/х/g, 'h')
        .replace(/ц/g, 'c')
        .replace(/ч/g, 'č')
        .replace(/џ/g, 'dž')
        .replace(/ш/g, 'š');

  // ToDo: ispravi velika/mala slova u Lj, Nj, Dž
  
    return text;
};

function getOptions(){
  var rxList = [];
  if (document.getElementById('skipTags').checked)
    rxList.push(tagPattern);
  if (document.getElementById('skipUrl').checked)
    rxList.push(urlPattern);
  
  return rxList;
}

function doTransliterate(txt, ignore, fn){

  var tags = getIgnoreList(txt, ignore);
  
 // replace ignored items with markers
 if (tags && tags.length>0)
    for (const tag of tags)
        txt = replaceAll(txt, tag.src, tag.dst);

// do the transliteration
txt = fn(txt);

// replace markers with original ignored items
 if (tags && tags.length>0)
    for (const tag of tags)
        txt = replaceAll(txt, tag.dst, tag.src);

 return txt;
}

function execTime(start, end){
  var t = Math.round(end-start);
    document.getElementById('infoLbl').innerHTML = "Made in " + t + " ms"
}

function toCir(){
var t = performance.now();
document.getElementById('destText').value = 
  doTransliterate( document.getElementById('srcText').value,
                   getOptions(),
                   lat2cir);
execTime(t, performance.now());
}

function toLat(){
var t = performance.now();
document.getElementById('destText').value = 
  doTransliterate( document.getElementById('srcText').value,
                   getOptions(),
                   cir2lat);
execTime(t, performance.now());
}

function clr(){
  document.getElementById('destText').value = "";
  document.getElementById('infoLbl').innerHTML = "";
}

function cpy() {
  var hasSelection = document.queryCommandEnabled('copy');
  var cutTextarea = document.getElementById('destText');
  cutTextarea.select();

  try {
    var lbl = document.getElementById('msgLbl');
    lbl.innerHTML = "";
    var successful = document.execCommand('copy');
    if (!successful)
      lbl.innerHTML = "Copying never succeeded";
  } catch (err) {
    lbl.innerHTML = 'Copy error: ' + err;
  }
}

function handleFile(files){
  if (!files || files.length == 0) return;
  
  var file = files[0]; // only single file for now
  if (file.size > 2*1024*1024 ){
    alert("We can't process files larger than 2MB");
    return;
  }
  
  var fr = new FileReader();
  
  fr.onloadend = () => {
    if (fr.readyState == 2)
      document.getElementById('srcText').value = fr.result;
    else
      document.getElementById('srcText').value = "Error reading file";
  };
  console.log(fr);
  
  fr.readAsText(file);
  
}
