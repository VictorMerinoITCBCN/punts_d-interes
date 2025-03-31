export class Csv {
    constructor(content, separator = ",") {
        this.rows = Csv.toArray(content, separator);
        this.keys = this.rows[0];
        this.rows.shift();
        this.rows = this.rows.map(row => new Row(row, this.keys));
    }

    static toArray(content, separator = ",") {
        return content.trim().split("\n").map(row => row.split(separator));
    }
}

class Row {
    constructor(row ,keys) {
        this.row = Row.toObject(row, keys);
        this.keys = keys;

        Object.assign(this, this.row);
    }

    static toObject(row, keys) {
        const object = {};
        for (let i = 0; i< keys.length; i++) {
            object[keys[i].toLowerCase()] = row[i];
        }

        return object;
    }
}