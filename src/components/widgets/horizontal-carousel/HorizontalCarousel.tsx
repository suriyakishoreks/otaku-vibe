import { skipToken, type TypedUseQuery } from "@reduxjs/toolkit/query/react";
import { SwipeCarousel } from "../../atoms/swipe-carousel";
import { ImageCard } from "../../atoms/image-card";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UseQuery = TypedUseQuery<any, any, any>;

type ExtractResultAndArgFromTypedUseQuery<THook extends UseQuery> =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    THook extends TypedUseQuery<infer R, infer A, any> ? { result: R, arg: A; } : never;

type ExtractDataTypeFromHook<THook extends UseQuery> =
    ExtractResultAndArgFromTypedUseQuery<THook>['result'];

type ExtractArgTypeFromHook<THook extends UseQuery> =
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
    adapter: (data: ExtractDataTypeFromHook<TQueryHook> | undefined) => HorizontalCarouselData[];
}

function HorizontalCarousel<TQueryHook extends UseQuery>({
    useQueryHook,
    options,
    adapter,
}: HorizontalCarouselProps<TQueryHook>) {
    const { data, isLoading } = useQueryHook(options);

    const adaptedData = data ? adapter(data) : [];

    if (isLoading) {
        return <div style={{ height: 300 }}>Loading...</div>; // You can replace this with a loading spinner or skeleton
    }

    return (
        <SwipeCarousel>
            {adaptedData.map((data) => {
                return (
                    <ImageCard
                        navigateTo={data.navigateTo}
                        src={data.imageUrl}
                        alt={data.title}
                        title={data.title}
                    />
                );
            }
            )}
        </SwipeCarousel>
    );
}

export default HorizontalCarousel;