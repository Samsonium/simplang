import Expression from "./Expression";

export default class Statement extends Expression {
    private _codeParts: Expression[] = [];

    public addNode(node: Expression) {
        this._codeParts.push(node);
    }

    public get codeParts(): Expression[] {
        return this._codeParts;
    }
}