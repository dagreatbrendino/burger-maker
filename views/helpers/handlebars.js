const register = (Handlebars) =>{
    const helpers = {
        isIn: (val1, array) =>{
            console.log(array.includes(val1))
            return array.includes(val1);
        }
    }

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        for (var prop in helpers) {
        Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        return helpers;
    }

};

module.exports.register = register;
module.exports.helpers = register(null); 