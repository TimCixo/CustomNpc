declare module 'com.blamejared.searchables.api.autcomplete' {
  import { AbstractWidget, EditBox } from 'net.minecraft.client.gui.components';
  import { Consumer, Supplier, Predicate } from 'java.util.function';
  import { SearchableType, TokenRange } from 'com.blamejared.searchables.api';
  import { List, Optional } from 'java.util';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';
  import { FormattingVisitor } from 'com.blamejared.searchables.api.formatter';
  import { Visitor } from 'com.blamejared.searchables.lang.expression.visitor';
  import { GroupingExpression, ComponentExpression, LiteralExpression, PairedExpression } from 'com.blamejared.searchables.lang.expression.type';

  interface AutoComplete<T = any> extends Consumer<string>, AbstractWidget {}
  class AutoComplete<T = any> extends Consumer<string> {
    constructor(type: SearchableType<T>, editBox: AutoCompletingEditBox<T>, entries: Supplier<T[]>, x: number, y: number, width: number, suggestionHeight: number);

    constructor(type: SearchableType<T>, editBox: AutoCompletingEditBox<T>, entries: Supplier<T[]>, x: number, y: number, width: number, suggestionHeight: number, maxSuggestions: number);
    accept(value: string): void;
    editBox(): AutoCompletingEditBox<T>;
    insertSuggestion(): void;
    isMouseOver(xpos: number, ypos: number): boolean;
    maxSuggestions(): number;
    mouseClicked(mx: number, my: number, mb: number): boolean;
    mouseScrolled(xpos: number, ypos: number, xDelta: number, yDelta: number): boolean;
    renderWidget(guiGraphics: GuiGraphics, mx: number, my: number, partial: number): void;
    scrollDown(): void;
    scrollDown(amount: number): void;
    scrollUp(): void;
    scrollUp(amount: number): void;
  }


  interface AutoCompletingEditBox<T = any> extends EditBox {}
  class AutoCompletingEditBox<T = any> extends EditBox {
    constructor(font: Font, x: number, y: number, width: number, height: number, message: Component, type: SearchableType<T>, entries: Supplier<T[]>);

    constructor(font: Font, x: number, y: number, width: number, height: number, thisBox: EditBox, message: Component, type: SearchableType<T>, entries: Supplier<T[]>);
    addResponder(responder: Consumer<string>): void;
    autoComplete(): AutoComplete<T>;
    completionVisitor(): CompletionVisitor;
    deleteChars(range: TokenRange): void;
    formattingVisitor(): FormattingVisitor;
    get filter(): Predicate<string>;
    get responder(): Consumer<string>;
    keyPressed(key: number, scancode: number, mods: number): boolean;
    mouseClicked(xpos: number, ypos: number, button: number): boolean;
    set responder(responder: Consumer<string>);
  }


  interface CompletionVisitor extends Visitor<TokenRange>, Consumer<string> {}
  class CompletionVisitor extends Visitor<TokenRange> {
    accept(search: string): void;
    postVisit(obj: TokenRange): TokenRange;
    rangeAt(position: number): TokenRange;
    reset(): void;
    tokenAt(position: number): Optional<TokenRange>;
    tokens(): TokenRange[];
    visitComponent(expr: ComponentExpression): TokenRange;
    visitGrouping(expr: GroupingExpression): TokenRange;
    visitLiteral(expr: LiteralExpression): TokenRange;
    visitPaired(expr: PairedExpression): TokenRange;
  }

}

declare module 'com.blamejared.searchables.api.context' {
  import { Visitor } from 'com.blamejared.searchables.lang.expression.visitor';
  import { GroupingExpression, ComponentExpression, LiteralExpression, PairedExpression } from 'com.blamejared.searchables.lang.expression.type';
  import { Predicate } from 'java.util.function';
  import { SearchableType } from 'com.blamejared.searchables.api';

  interface ContextVisitor<T = any> extends Visitor<SearchContext> {}
  class ContextVisitor<T = any> extends Visitor<SearchContext> {
    visitComponent(expr: ComponentExpression): SearchContext<T>;
    visitGrouping(expr: GroupingExpression): SearchContext<T>;
    visitLiteral(expr: LiteralExpression): SearchContext<T>;
    visitPaired(expr: PairedExpression): SearchContext<T>;
  }


  class SearchContext<T = any> {
    add(literal: SearchPredicate<T>): void;
    createPredicate(type: SearchableType<T>): Predicate<T>;
  }


  class SearchPredicate<T = any> {
    predicateFrom(var1: SearchableType<T>): Predicate<T>;
  }

}

declare module 'com.blamejared.searchables.api.formatter' {
  import { ContextAwareVisitor } from 'com.blamejared.searchables.lang.expression.visitor';
  import { TokenRange, SearchableType } from 'com.blamejared.searchables.api';
  import { Consumer, BiFunction } from 'java.util.function';
  import { Integer } from 'java.lang';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { List, Optional } from 'java.util';
  import { Pair } from 'com.mojang.datafixers.util';
  import { Style } from 'net.minecraft.network.chat';
  import { GroupingExpression, ComponentExpression, LiteralExpression, PairedExpression } from 'com.blamejared.searchables.lang.expression.type';

  class FormattingConstants {
  }


  interface FormattingVisitor extends ContextAwareVisitor<TokenRange, FormattingContext>, Consumer<string>, BiFunction<string, number, FormattedCharSequence> {}
  class FormattingVisitor extends ContextAwareVisitor<TokenRange, FormattingContext> {
    constructor(type: SearchableType<any>);
    accept(search: string): void;
    apply(currentString: string, offset: number): FormattedCharSequence;
    reset(): void;
    tokenAt(position: number): Optional<Pair<TokenRange, Style>>;
    tokens(): Pair<TokenRange, Style>[];
    visitComponent(expr: ComponentExpression, context: FormattingContext): TokenRange;
    visitGrouping(expr: GroupingExpression, context: FormattingContext): TokenRange;
    visitLiteral(expr: LiteralExpression, context: FormattingContext): TokenRange;
    visitPaired(expr: PairedExpression, context: FormattingContext): TokenRange;
  }

}

declare module 'com.blamejared.searchables.api' {
  import { BiPredicate, Function, Predicate } from 'java.util.function';
  import { Optional, Map, List, Collection, Set, Iterator } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { CompletionSuggestion } from 'com.blamejared.searchables.api.autcomplete';
  import { Comparable, Iterable } from 'java.lang';

  class SearchableComponent<T = any> {
    static create<T>(key: string, filter: BiPredicate<T, string>): SearchableComponent<T>;
    static create<T>(key: string, toString: Function<T, Optional<string>>, filter: BiPredicate<T, string>): SearchableComponent<T>;
    static create<T>(key: string, toString: Function<T, Optional<string>>): SearchableComponent<T>;
    filter(): BiPredicate<T, string>;
    getToString(): Function<T, Optional<string>>;
    key(): string;
    toString(): string;
  }


  class SearchablesConstants {
    static readonly MOD_ID: string;
    static readonly STRING_CHARACTERS: string;
    static readonly COMPONENT_SEARCH: Component;
    static readonly VALID_SUGGESTION: Predicate;
    static readonly QUOTE: Function;
    static rl(path: string): ResourceLocation;
  }


  class SearchableType<T = any> {
    component(key: string): Optional<SearchableComponent<T>>;
    components(): Map<string, SearchableComponent<T>>;
    defaultComponent(): Optional<SearchableComponent<T>>;
    filterEntries(entries: T[], search: string): T[];
    filterEntries(entries: T[], search: string, extraPredicate: Predicate<T>): T[];
    getSuggestionsFor(entries: T[], currentToken: string, position: number, replacementRange: TokenRange): CompletionSuggestion[];
    getSuggestionsForComponent(componentName: string, replacementRange: TokenRange): CompletionSuggestion[];
    getSuggestionsForTerm(entries: T[], componentName: string, current: string, replacementRange: TokenRange): CompletionSuggestion[];
  }


  interface TokenRange extends Comparable<TokenRange>, Iterable<TokenRange> {}
  class TokenRange extends Comparable<TokenRange> {
    static readonly EMPTY: TokenRange;
    addRange(range: TokenRange): void;
    addRanges(ranges: Collection<TokenRange>): void;
    static at(position: number): TokenRange;
    static between(start: number, end: number): TokenRange;
    compareTo(o: TokenRange): number;
    contains(position: number): boolean;
    covers(other: TokenRange): boolean;
    delete(from: string): string;
    static encompassing(first: TokenRange, second: TokenRange): TokenRange;
    end(): number;
    equals(o: any): boolean;
    hashCode(): number;
    insert(to: string, toInsert: string): string;
    isEmpty(): boolean;
    iterator(): Iterator<TokenRange>;
    length(): number;
    range(index: number): TokenRange;
    rangeAtPosition(position: number): TokenRange;
    rangeIndexAtPosition(position: number): number;
    recalculate(): TokenRange;
    replace(into: string, toInsert: string): string;
    simplify(): TokenRange;
    start(): number;
    subRanges(): Set<TokenRange>;
    substring(of: string): string;
    substring(of: string, end: number): string;
    toString(): string;
  }

}

declare module 'com.blamejared.searchables.api.SearchableType' {
  import { SearchableComponent, SearchableType } from 'com.blamejared.searchables.api';

  class Builder<T = any> {
    build(): SearchableType<T>;
    component(component: SearchableComponent<T>): Builder<T>;
    component(key: string, component: SearchableComponent<T>): Builder<T>;
    defaultComponent(component: SearchableComponent<T>): Builder<T>;
    defaultComponent(key: string, component: SearchableComponent<T>): Builder<T>;
  }

}

declare module 'com.blamejared.searchables.lang.expression' {
  import { Visitor, ContextAwareVisitor } from 'com.blamejared.searchables.lang.expression.visitor';

  class Expression {
    accept<R>(var1: Visitor<R>): R;
    accept<R, C>(var1: ContextAwareVisitor<R, C>, var2: C): R;
  }

}

declare module 'com.blamejared.searchables.lang.expression.type' {
  import { Expression } from 'com.blamejared.searchables.lang.expression';
  import { Token } from 'com.blamejared.searchables.lang';
  import { Visitor, ContextAwareVisitor } from 'com.blamejared.searchables.lang.expression.visitor';

  interface ComponentExpression extends Expression {}
  class ComponentExpression extends Expression {
    constructor(left: Expression, operator: Token, right: Expression);
    accept<R>(visitor: Visitor<R>): R;
    accept<R, C>(visitor: ContextAwareVisitor<R, C>, context: C): R;
    left(): Expression;
    operator(): Token;
    right(): Expression;
    toString(): string;
  }


  interface GroupingExpression extends Expression {}
  class GroupingExpression extends Expression {
    constructor(left: Expression, operator: Token, right: Expression);
    accept<R>(visitor: Visitor<R>): R;
    accept<R, C>(visitor: ContextAwareVisitor<R, C>, context: C): R;
    left(): Expression;
    operator(): Token;
    right(): Expression;
    toString(): string;
  }


  interface LiteralExpression extends Expression {}
  class LiteralExpression extends Expression {
    constructor(value: string, displayValue: string);
    accept<R>(visitor: Visitor<R>): R;
    accept<R, C>(visitor: ContextAwareVisitor<R, C>, context: C): R;
    displayValue(): string;
    toString(): string;
    value(): string;
  }


  interface PairedExpression extends Expression {}
  class PairedExpression extends Expression {
    constructor(first: Expression, second: Expression);
    accept<R>(visitor: Visitor<R>): R;
    accept<R, C>(visitor: ContextAwareVisitor<R, C>, context: C): R;
    first(): Expression;
    second(): Expression;
  }

}

declare module 'com.blamejared.searchables.lang.expression.visitor' {
  import { GroupingExpression, ComponentExpression, LiteralExpression, PairedExpression } from 'com.blamejared.searchables.lang.expression.type';

  class ContextAwareVisitor<R = any, C = any> {
    postVisit(obj: R, context: C): R;
    visitComponent(var1: ComponentExpression, var2: C): R;
    visitGrouping(var1: GroupingExpression, var2: C): R;
    visitLiteral(var1: LiteralExpression, var2: C): R;
    visitPaired(var1: PairedExpression, var2: C): R;
  }


  class Visitor<R = any> {
    postVisit(obj: R): R;
    visitComponent(var1: ComponentExpression): R;
    visitGrouping(var1: GroupingExpression): R;
    visitLiteral(var1: LiteralExpression): R;
    visitPaired(var1: PairedExpression): R;
  }

}

declare module 'com.blamejared.searchables.lang' {
  import { List, Optional } from 'java.util';
  import { Expression } from 'com.blamejared.searchables.lang.expression';
  import { Visitor, ContextAwareVisitor } from 'com.blamejared.searchables.lang.expression.visitor';
  import { Enum } from 'java.lang';

  class SLParser {
    constructor(tokens: Token[]);
    parse(): Optional<Expression>;
  }


  class SLScanner {
    constructor(source: string);
    scanTokens(): Token[];
  }


  class StringSearcher {
    static expression(search: string): Optional<Expression>;
    static search<T>(search: string, visitor: Visitor<T>): Optional<T>;
    static search<T, C>(search: string, visitor: ContextAwareVisitor<T, C>, context: C): Optional<T>;
  }


  class Token {
    constructor(type: TokenType, lexeme: string, literal: string, start: number, end: number);
    end(): number;
    lexeme(): string;
    literal(): string;
    start(): number;
    toString(): string;
    type(): TokenType;
  }


  interface TokenType extends Enum<TokenType> {}
  class TokenType extends Enum<TokenType> {
    static readonly COLON: TokenType;
    static readonly IDENTIFIER: TokenType;
    static readonly STRING: TokenType;
    static readonly SPACE: TokenType;
    static readonly EOL: TokenType;
    static valueOf(name: string): TokenType;
    static values(): TokenType[];
  }

}

declare module 'com.blamejared.searchables.mixin' {
  import { Predicate, Consumer } from 'java.util.function';

  class AccessEditBox {
    searchables$getFilter(): Predicate<string>;
    searchables$getResponder(): Consumer<string>;
  }

}

declare module 'com.blamejared.searchables' {
  import { IEventBus } from 'net.neoforged.bus.api';

  class SearchablesNeoForge {
    constructor(eventBus: IEventBus);
  }

}