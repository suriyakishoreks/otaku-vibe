import { skipToken, type TypedUseQuery } from "@reduxjs/toolkit/query/react";
import { ImageCard } from "../../atoms/image-card";
import styles from "./SearchResult.module.scss";
import React from "react";
import { ImageCardLoading } from "../../atoms/image-card/ImageCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UseQuery = TypedUseQuery<any, any, any>;

type ExtractResultAndArgFromTypedUseQuery<THook extends UseQuery> =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    THook extends TypedUseQuery<infer R, infer A, any> ? { result: R, arg: A; } : never;

type ExtractDataTypeFromHook<THook extends UseQuery> =
    ExtractResultAndArgFromTypedUseQuery<THook>['result'];

type ExtractArgTypeFromHook<THook extends UseQuery> =
    ExtractResultAndArgFromTypedUseQuery<THook>['arg'];

interface ImageCardData {
    key: string,
    title: string;
    imageUrl: string;
    navigateTo?: string;
    alt: string;
    ratings?: string;
    favorites?: string;
}

interface SearchResultProps<TQueryHook extends UseQuery> {
    useQueryHook: TQueryHook;
    options: ExtractArgTypeFromHook<TQueryHook> | typeof skipToken;
    adapter: (
        data: ExtractDataTypeFromHook<TQueryHook>
    ) => ImageCardData[];
}

function SearchResult<TQueryHook extends UseQuery>({
    useQueryHook,
    options,
    adapter,
}: SearchResultProps<TQueryHook>) {

    const { data } = useQueryHook(options);

    const adaptedData = data ? adapter(data) : undefined;

    const getContent = React.useCallback((): React.ReactNode[] => {
        if (!adaptedData) {
            return Array.from({ length: 15 }, () => ({})).map((_, idx) => <ImageCardLoading key={idx} />);
        }

        return (adaptedData as ImageCardData[]).map((data) => (
            <ImageCard
                key={data.key}
                navigateTo={data.navigateTo}
                src={data.imageUrl}
                alt={data.title}
                title={data.title}
                ratings={data.ratings}
                favorites={data.favorites}
            />
        ));
    }, [adaptedData]);

    return (
        <div className={styles.results}>
            {getContent()}
        </div>
    );
}

export default SearchResult;