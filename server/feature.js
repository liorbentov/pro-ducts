var featuresNames = {
    "1" : "מצלמה",
    "2" : "בטריה",
    "5" : "מסך", 
    "7" : "שמע - פנימי וחיצוני",
    "11" : "ביצועים",
    "13" : "גודל, משקל ואחיזה",
    "14" : "עיצוב ופלסטיקה",
    "15" : "אותות, קרינה והעברת נתונים",
    "16" : "אביזרים נלווים",
    "17" : "מחיר", 
    "19" : "תוכנה",
    "20" : "שרידות",
    "21" : "כללי",
    "23" : "ממשק ונוחות"
};

var getFeatures = function() {
    return featuresNames;
}

module.exports = {
    getFeatures : getFeatures
}