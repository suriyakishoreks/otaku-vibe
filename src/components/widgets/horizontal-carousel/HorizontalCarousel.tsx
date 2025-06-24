import { skipToken, type TypedUseQuery } from "@reduxjs/toolkit/query/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UseQuery = TypedUseQuery<any, any, any>;

export type ExtractResultAndArgFromTypedUseQuery<THook extends UseQuery> =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    THook extends TypedUseQuery<infer R, infer A, any> ? { result: R, arg: A; } : never;

export type ExtractDataTypeFromHook<THook extends UseQuery> =
    ExtractResultAndArgFromTypedUseQuery<THook>['result'];

export type ExtractArgTypeFromHook<THook extends UseQuery> =
    ExtractResultAndArgFromTypedUseQuery<THook>['arg'];

interface HorizontalCarouselData {
    title: string;
    imageUrl: string;
    navigateTo?: string;
    alt?: string;
    summary?: string;
}

interface HorizontalCarouselProps<TQueryHook extends UseQuery> {
    useQueryHook: TQueryHook;
    options: ExtractArgTypeFromHook<TQueryHook> | typeof skipToken;
    adapter: (data: ExtractDataTypeFromHook<TQueryHook> | undefined) => HorizontalCarouselData;
}

function HorizontalCarousel<TQueryHook extends UseQuery>({
    useQueryHook,
    options,
    adapter,
}: HorizontalCarouselProps<TQueryHook>) {
    const { data } = useQueryHook(options);

    const adaptedData = data ? adapter(data) : [];

    return (
        <div>HorizontalCarousel</div>
    );
}

export default HorizontalCarousel;