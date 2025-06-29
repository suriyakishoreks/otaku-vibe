import { skipToken, type TypedUseQuery } from "@reduxjs/toolkit/query/react";
import { ImageCard } from "../../atoms/image-card";
import styles from "./SearchResult.module.scss";
import React, { useState } from "react";
import { ImageCardLoading } from "../../atoms/image-card/ImageCard";
import type { JikanPagination } from "../../../services/jikan/models";

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

interface SearchResultData {
    data: ImageCardData[];
    pagination?: JikanPagination;
}

interface SearchResultProps<TQueryHook extends UseQuery> {
    useQueryHook: TQueryHook;
    options: ExtractArgTypeFromHook<TQueryHook> | typeof skipToken;
    adapter: (
        data: ExtractDataTypeFromHook<TQueryHook>
    ) => SearchResultData;
}

function SearchResult<TQueryHook extends UseQuery>({
    useQueryHook,
    options,
    adapter,
}: SearchResultProps<TQueryHook>) {

    const { data } = useQueryHook(options);

    const [page, setPage] = useState(1);

    const adaptedData = data ? adapter(data) : undefined;

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const getContent = React.useCallback((): React.ReactNode[] => {
        if (!adaptedData || !adaptedData.data) {
            return Array.from({ length: 25 }, () => ({})).map((_, idx) => <ImageCardLoading key={idx} />);
        }

        return (adaptedData.data).map((data) => (
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
            <div className={styles.pagination}>
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span>Page {page} of {data.pagination.last_visible_page}</span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={!data.pagination.has_next_page}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default SearchResult;