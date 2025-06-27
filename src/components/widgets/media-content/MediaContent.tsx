import styles from './MediaContent.module.scss';
import { Image } from '../../atoms/image';
import { Label } from '../../atoms/label';
import classNames from 'classnames';
import { type TypedUseQuery } from "@reduxjs/toolkit/query/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UseQuery = TypedUseQuery<any, any, any>;

type ExtractResultAndArgFromTypedUseQuery<THook extends UseQuery> =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    THook extends TypedUseQuery<infer R, infer A, any> ? { result: R, arg: A; } : never;

type ExtractDataTypeFromHook<THook extends UseQuery> =
    ExtractResultAndArgFromTypedUseQuery<THook>['result'];

type ExtractArgTypeFromHook<THook extends UseQuery> =
    ExtractResultAndArgFromTypedUseQuery<THook>['arg'];

interface MediaStats {
    rating?: string;
    favorite?: string;
    rank?: string;
    popularity?: string;
    listed?: string;
}

// interface MediaInfo {
//     episodes?:
// }

interface MediaContentData {
    imageSrc: string;
    imageAlt: string;
    title: string;
    contentType?: string;
    titleEnglish?: string;
    mediaStats?: MediaStats;
    summary?: string;
    genres?: string[];
}

type ContentType = 'anime' | 'manga' | 'person' | 'character';

interface MediaContentProps<TQueryHook extends UseQuery, TContentType extends ContentType> {
    cardType?: TContentType;
    useQueryHook: TQueryHook;
    options: ExtractArgTypeFromHook<TQueryHook>;
    adapter: (
        data: ExtractDataTypeFromHook<TQueryHook>
    ) => MediaContentData;
}

function MediaContent<TQueryHook extends UseQuery, TContentType extends ContentType = 'anime'>({
    useQueryHook,
    options,
    adapter
}: MediaContentProps<TQueryHook, TContentType>) {

    const { data: queryData } = useQueryHook(options);

    const data = queryData ? adapter(queryData) : undefined;

    if (!data) {
        return null;
    }

    return (
        <article className={styles['media-content']}>
            <div className={styles['media-content__primary-content']}>
                <div className={styles['image-card']}>
                    <Image src={data.imageSrc} alt={data.imageAlt} className={styles['image-card__image']} />
                    <div className={styles['image-card__gradient']} />
                    <div className={styles['image-card__overlay-title']}>
                        <Label as='h2' font='typo-primary-xl-semibold'>{data.title}</Label>
                        {!!data.titleEnglish && (data.titleEnglish !== data.title) && <Label as='h2' font='typo-primary-m-semibold' className={styles['image-card__overlay-title-english']}>{data.titleEnglish}</Label>}
                    </div>
                    {!!data.contentType && <Label as='span' font='typo-primary-m-semibold' className={styles['image-card__content-type']}>{data.contentType}</Label>}
                </div>
                {!!data.mediaStats && <div className={styles['media-stats']}>
                    {!!data.mediaStats.rating && <Label as='span' font='typo-primary-m-medium' className={classNames(styles['media-stats__stat'], styles['media-stats__stat--rating'])}>{data.mediaStats.rating}</Label>}
                    {!!data.mediaStats.favorite && <Label as='span' font='typo-primary-m-medium' className={classNames(styles['media-stats__stat'], styles['media-stats__stat--favorite'])}>{data.mediaStats.favorite}</Label>}
                    {!!data.mediaStats.rank && <Label as='span' font='typo-primary-m-medium' className={classNames(styles['media-stats__stat'], styles['media-stats__stat--rank'])}>{data.mediaStats.rank}</Label>}
                    {!!data.mediaStats.popularity && <Label as='span' font='typo-primary-m-medium' className={classNames(styles['media-stats__stat'], styles['media-stats__stat--popularity'])}>{data.mediaStats.popularity}</Label>}
                    {!!data.mediaStats.listed && <Label as='span' font='typo-primary-m-medium' className={classNames(styles['media-stats__stat'], styles['media-stats__stat--listed'])}>{data.mediaStats.listed}</Label>}
                </div>}
            </div>
            <div className={styles['media-content__secondary-content']}>
                <div className={styles['title']}>
                    <Label as='h2' font='typo-primary-xl-semibold'>{data.title}</Label>
                    {!!data.titleEnglish && (data.titleEnglish !== data.title) && <Label as='h2' font='typo-primary-m-semibold' className={styles['title--english']}>{data.titleEnglish}</Label>}
                </div>
                {!!data.summary && <Label as='p' font='typo-primary-m-regular' className={styles['summary']}>{data.summary}</Label>}

                {/* <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 12 }}>
                    <Label as="span" font="typo-primary-m-regular" style={{ color: "#475569" }}>
                        <b>Episodes:</b> {'anime.episodes' ?? "?"}
                    </Label>
                    <Label as="span" font="typo-primary-m-regular" style={{ color: "#475569" }}>
                        <b>Duration:</b> {'anime.duration'}
                    </Label>
                    <Label as="span" font="typo-primary-m-regular" style={{ color: "#475569" }}>
                        <b>Status:</b> {'anime.status'}
                    </Label>
                    <Label as="span" font="typo-primary-m-regular" style={{ color: "#475569" }}>
                        <b>Rating:</b> {'anime.rating'}
                    </Label>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 12 }}>
                    <Label as="span" font="typo-primary-m-regular" style={{ color: "#475569" }}>
                        <b>Aired:</b> {'anime.aired?.string'}
                    </Label>
                    <Label as="span" font="typo-primary-m-regular" style={{ color: "#475569" }}>
                        <b>Broadcast:</b> {'anime.broadcast?.string'} {'anime.broadcast?.timezone'}
                    </Label>
                </div> */}

                {!!data.genres && data.genres.length > 0 && <div className={styles.genre}>
                    <Label as='h4' font='typo-primary-l-medium'>Genre</Label>
                    <div className={styles['genre__group']}>
                        {data.genres.map((genre) => <Label key={genre} as='span' font='typo-primary-m-medium' className={styles['genre__item']}>{genre}</Label>)}
                    </div>
                </div>}
            </div>
        </article>
    );
}

export default MediaContent;