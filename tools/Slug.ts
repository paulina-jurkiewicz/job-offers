import { ISlug } from '~/interfaces/ISlug';

export class Slug implements ISlug {
    private value: string;
    private from: string;
    private to: string;
    private regex: RegExp;

    constructor( value: string ) {
        this.value = value;
        this.from = 'ąśćżźłóńęĄŚŻŹĆŃŁÓĘ';
        this.to = 'asczzloneASZZCNLOE';
        this.regex = new RegExp( this.from.split( '' ).join( '|' ), 'g' );
    }

    public getValue(): string {
        return this.value.toString()
            .toLowerCase()
            .replace( this.regex, ( c ) => this.to.charAt( this.from.indexOf( c ) ) );
    }
}
