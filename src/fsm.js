class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config == undefined) {
            throw new Error("Error! Config is empty!");
        }
        this.config = config;
        this.state = this.config.initial;
        this.before = undefined;
        this.after = undefined;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        try {
            let tr = this.config.states;
            for (let key in tr) {
                if (key == state) {
                    this.before = this.state;
                    this.state = state;
                    return true;
                }
            }
            throw new Error("Error! Unknown state! Change state is failed!");
        }
        catch (err) {
            throw new Error(err);
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        try {
            let tr = this.config.states[this.state].transitions;
            for (let key in tr) {
                if (key == event) {
                    this.before = this.state;
                    this.state = tr[key];
                    return true;
                }
            }
            throw new Error("Error! This event don't exist in current state!")
        }
        catch (Err) {throw Err;}
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (this.config == undefined) {
            throw new Error("Error! Config is empty!");
        }
        let tr = this.config.states;
        let arr =  [];
        if (event == undefined) {
            for (let key in tr) {
                arr.push(key);
            }
        }
        else {
            for (let key in tr) {
                for (let ley in tr[key].transitions) {
                    if (ley == event) arr.push(key);
                }
            }
        }
        return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.before == undefined) {
            return false;
        }
        else {
            this.after = this.state;
            this.state = this.before;
            this.before = undefined;
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.after == undefined) {
            return false;
        }
        else {
            this.before = this.state;
            this.state = this.after;
            this.after = undefined;
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.before = undefined;
        this.after = undefined;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
