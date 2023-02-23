import Token from "../lexer/token/Token";
import TokenType, { tokenTypeList } from "../lexer/token/TokenType";
import BinaryExpression from "./ast/BinaryExpression";
import Expression from "./ast/Expression";
import NumberExpression from "./ast/NumberExpression";
import Statement from "./ast/Statement";
import UnaryExpression from "./ast/UnaryExpression";
import VariableExpression from "./ast/VariableExpression";

export default class Parser {
    private tokens: Token[];
    private pos: number = 0;
    private scope: any = {};

    public constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    public parse(): Expression {
        const root = new Statement();
        while (this.pos < this.tokens.length) {
            const codeStr = this.parseExpression();
            this.require(tokenTypeList.SEMICOLON);
            root.addNode(codeStr);
        }

        return root;
    }

    public execute(node: Expression): any {
        if (node instanceof NumberExpression)
            return parseInt(node.number.text);

        if (node instanceof UnaryExpression) {
            switch (node.operator.type.name) {
                case tokenTypeList.LOG.name:
                    console.log(this.execute(node.operand));
                    return;
            }
        }

        if (node instanceof BinaryExpression) {
            switch (node.operator.type.name) {
                case tokenTypeList.PLUS.name:
                    return this.execute(node.leftNode) + this.execute(node.rightNode);
                case tokenTypeList.MINUS.name:
                    return this.execute(node.leftNode) - this.execute(node.rightNode);
                case tokenTypeList.ASSIGN.name:
                    const result = this.execute(node.rightNode);
                    const variable = <VariableExpression>node.leftNode;
                    this.scope[variable.variable.text] = result;
                    return result;
            }
        }

        if (node instanceof VariableExpression) {
            if (this.scope[node.variable.text])
                return this.scope[node.variable.text];
            else throw new Error(`Обращение к неизвестной переменной ${node.variable.text} на позиции ${this.pos}`);
        }

        if (node instanceof Statement) {
            node.codeParts.forEach(cStr => {
                this.execute(cStr);
            });
            return;
        }

        throw new Error(`Неизвестная ошибка на позиции ${this.pos}`)
    }

    //////////////////////////////////////////////////////

    private parseExpression(): Expression {
        if (this.match(tokenTypeList.VARIABLE) == null) {
            const printNode = this.parsePrint();
            return printNode;
        }

        this.pos--;
        const variable = this.parseVariableOrNumber();
        const assignOp = this.match(tokenTypeList.ASSIGN);
        if (assignOp) {
            const rFormula = this.parseFormula();
            const binary = new BinaryExpression(assignOp, variable, rFormula);
            return binary;
        }

        throw new Error(`Неизвестное выражение на позиции ${this.pos}`);
    }

    // Parse parens ()
    private parseParens(): Expression {
        if (this.match(tokenTypeList.LPAR)) {
            const formula = this.parseFormula();
            this.require(tokenTypeList.RPAR);
            return formula;
        } else {
            return this.parseVariableOrNumber();
        }
    }

    // Parse expressions recursively
    private parseFormula(): Expression {
        let left = this.parseParens();
        let op = this.match(tokenTypeList.PLUS, tokenTypeList.MINUS);
        while (op) {
            const right = this.parseParens();
            left = new BinaryExpression(op, left, right);
            op = this.match(tokenTypeList.PLUS, tokenTypeList.MINUS);
        }

        return left;
    }

    // Parse print unary expression
    private parsePrint(): Expression {
        const token = this.match(tokenTypeList.LOG);
        if (token) return new UnaryExpression(token, this.parseFormula());

        throw new Error(`Неверный синтаксис на позиции ${this.pos}`);
    }

    // Parse variable or number
    private parseVariableOrNumber(): Expression {
        const number = this.match(tokenTypeList.NUMBER);
        if (number) return new NumberExpression(number);

        const variable = this.match(tokenTypeList.VARIABLE);
        if (variable) return new VariableExpression(variable);

        throw new Error(`На позиции ${this.pos} ожидалось число или имя переменной.`);
    }

    //////////////////////////////////////////////////////

    // Match expected tokens with current
    private match(...expected: TokenType[]): Token | null {
        if (this.pos < this.tokens.length) {
            const token = this.tokens[this.pos];
            if (expected.find(t => t.name == token.type.name)) {
                this.pos++;
                return token;
            }
        }

        return null;
    }

    // Search for required tokens
    private require(...expected: TokenType[]): Token {
        const token = this.match(...expected);
        if (!token)
            throw new Error(`На позиции ${this.pos} ожидался ${expected[0].name}`)
        return token;
    }
}