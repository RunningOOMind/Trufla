const fs = require('fs');
const dictionary = require('./dictionary');

 class Store{
    constructor()
    {
        this.path = './dictionary.file';
        this.args = [...process.argv];
    }

    clear()
    {
        fs.writeFileSync(this.path,'');
        return 'Dictionary Cleared!!'
    }

    add(dictionary) {
        const data = this.get(dictionary.key);
        if(data == 'Key not found.')
        {
            if(dictionary.value != undefined)
            {
                fs.appendFileSync(this.path, dictionary.key + ':' + dictionary.value + ',');
                return 'Added Successfully!!';
            }
            return 'Please, enter value.'
        }
        else if(data == 'Please, enter key.')
        {
            return 'Please, enter key.';
        }            

        return 'Key already exists.';
    }

    list() {
        return fs.readFileSync(this.path, 'utf8').replace(/,/g, '\n').replace(/:/g, ' : ');
    }

    get(key) {
        if ( key != undefined)
        {
            const result =  fs.readFileSync(this.path, 'utf8').split(',')
                .map(d => new dictionary(d.split(':')[0], d.split(':')[1]))
                .find(d => d.key.toLowerCase() === key.toLowerCase());

            return result ? result.toString() : 'Key not found.';
        }
        return 'Please, enter key.';
    }

    remove(key) {
        if(key != undefined)
        {
            const data =  fs.readFileSync(this.path, 'utf8').split(',')
                .map(d => new dictionary(d.split(':')[0], d.split(':')[1]))
                .find(d => d.key.toLowerCase() === key.toLowerCase());
                
            if(data != undefined)
            {
                const format = data.key + ':' + data.value + ',';
                const result = fs.readFileSync(this.path, 'utf8').replace(format, '');
                fs.writeFileSync(this.path,result);
                return "Removed Successfully!!";
            }
            return 'Key not found.';
        }
        else
            return 'Please, enter key.'
    }
    
}

module.exports = new Store();