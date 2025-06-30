import { type TypedUseQuery } from "@reduxjs/toolkit/query/react";
import { ImageCard } from "../../atoms/image-card";
import styles from "./SearchResult.module.scss";
import React from "react";
import { ImageCardLoading } from "../../atoms/image-card/ImageCard";
import type { JikanPagination } from "../../../services/jikan/models";
import { useSearchParams } from "react-router";
import { Label } from "../../atoms/label";
import classNames from "classnames";

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
    options: ExtractArgTypeFromHook<TQueryHook>;
    adapter: (
        data: ExtractDataTypeFromHook<TQueryHook>
    ) => SearchResultData;
}

function SearchResult<TQueryHook extends UseQuery>({
    useQueryHook,
    options,
    adapter,
}: SearchResultProps<TQueryHook>) {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data, isFetching } = useQueryHook(options);

    const adaptedData = data ? adapter(data) : undefined;

    const handlePageChange = (newPage: number) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('page', newPage.toString());
            return newParams;
        }, { replace: true });
    };

    const getContent = (): React.ReactNode => {
        if (!adaptedData || !adaptedData.data || isFetching) {
            return Array.from({ length: 25 }, (_, idx) => <ImageCardLoading key={idx} grid />);
        }

        if (adaptedData.data.length === 0) {
            return (
                <Label as="p" font="typo-primary-xl-medium" className={styles['no-result']}>No results found</Label>
            );
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
                grid
            />
        ));
    };

    const page = Number(searchParams.get('page') ?? '1');

    return (
        <div className={styles['search-result']}>
            <div className={classNames(styles['search-result__grid'])}>
                {getContent()}
            </div>
            {adaptedData?.pagination && adaptedData.pagination.last_visible_page > 1 && (
                <div className={styles['search-result__pagination']}>
                    <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                        <Label as="p" font="typo-primary-m-semibold">Previous</Label>
                    </button>
                    <Label as="p" font="typo-primary-m-medium">Page {page} of {adaptedData.pagination.last_visible_page}</Label>
                    <button onClick={() => handlePageChange(page + 1)} disabled={!adaptedData.pagination.has_next_page}>
                        <Label as="p" font="typo-primary-m-semibold">Next</Label>
                    </button>
                </div>
            )}
        </div>
    );
}

export default SearchResult;