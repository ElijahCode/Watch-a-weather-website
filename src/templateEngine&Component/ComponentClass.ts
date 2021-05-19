export interface Component<State = {}> {
    state: State;
    events: {
        [key: string]: (ev: Event) => void;
    };
    // constructor(el: HTMLElement, initialState?: Partial<State>);
    subscribeToEvents(): void;
    setState(patch: any): void;
    onMount(el: HTMLElement): void;
    render(): string;
}