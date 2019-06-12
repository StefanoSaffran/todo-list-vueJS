export default class TodoService {

    constructor(url) {
        this._resource = url
    }

    _handleErrors(res) {
        if (!res.ok) throw new Error(res.statusText);
        return res;
    }

    list() {

        return fetch(`${this._resource}?_limit=5`)
            .then(res => this._handleErrors(res))
            .then(res => res.json());
    }

    register(todo) {

        return fetch(this._resource, {
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            body: JSON.stringify(todo)
        })
            .then(res => this._handleErrors(res))
            .then(res => res.json());
    }

    delete(id) {

        return fetch(`${this._resource}/${id}`, {
            method: 'delete'
        })
            .then(res => this._handleErrors(res))
            .then(res => res.json());

    }
}