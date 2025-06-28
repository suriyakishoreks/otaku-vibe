import styles from './MediaContent.module.scss';
import { Image } from '../../atoms/image';
import { Label } from '../../atoms/label';
import classNames from 'classnames';
import { type TypedUseQuery } from "@reduxjs/toolkit/query/react";
import { Link } from 'react-router';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UseQuery = TypedUseQuery<any, any, any>;

type ExtractResultAndArgFromTypedUseQuery<THook extends UseQuery> =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    THook extends TypedUseQuery<infer R, infer A, any> ? { result: R, arg: A; } : never;

type ExtractDataTypeFromHook<THook extends UseQuery> =
    ExtractResultAndArgFromTypedUseQuery<THook>['result'];

type ExtractArgTypeFromHook<THook extends UseQuery> =
    ExtractResultAndArgFromTypedUseQuery<THook>['arg'];

export interface MediaStats {
    rating?: string;
    favorite?: string;
    rank?: string;
    popularity?: string;
    listed?: string;
}

export interface StringGroupData {
    title: string;
    group: { title?: string, text: string, link?: string, external?: boolean; }[];
}

export interface ContentGroupData {
    title: string;
    group: { imgSrc?: string, title: string, desc?: string, link?: string, external?: boolean; }[];
}

export interface MediaContentData {
    imageSrc: string;
    imageAlt: string;
    title: string;
    contentType?: string;
    titleEnglish?: string;
    mediaStats?: MediaStats;
    summary?: string;
    infoGroup?: StringGroupData;
    primaryStringGroup?: StringGroupData;
    secondaryStringGroup?: StringGroupData;
    tertiaryStringGroup?: StringGroupData;
    youtubeEmbed?: { title?: string, link: string; };
    primaryContentGroup?: ContentGroupData;
    secondaryContentGroup?: ContentGroupData;
    tertiaryContentGroup?: ContentGroupData;

    // Creater?
}

// Anime - producers, studio, theme, demographic, 
// manga - authors, 
// character - anime, manga, voices
// person - anime, manga, voices

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
                <StringGroup data={data.infoGroup} type='info' />
                <StringGroup data={data.primaryStringGroup} type='primary' />
                <StringGroup data={data.secondaryStringGroup} type='secondary' />
                <StringGroup data={data.tertiaryStringGroup} type='tertiary' />
                {!!data.youtubeEmbed && !!data.youtubeEmbed.link && <iframe className={styles.youtube} src={data.youtubeEmbed.link}
                    title="YouTube" frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                </iframe>}
                <ContentGroup data={data.primaryContentGroup} />
                <ContentGroup data={data.secondaryContentGroup} />
                <ContentGroup data={data.tertiaryContentGroup} />
            </div>
        </article>
    );
}

function StringGroup({ data, type }: { data?: StringGroupData, type: 'info' | 'primary' | 'secondary' | 'tertiary'; }) {
    return (
        !!data && data.group.length > 0 && <div className={styles['string-group']}>
            <Label as='h4' font='typo-primary-l-semibold'>{data.title}</Label>
            <div className={styles['string-group__group']}>
                {data.group.map((data) => {
                    const content = <Label key={data.text} as='p' font='typo-primary-m-medium' className={classNames(styles['string-group__item'], styles[`string-group__item--${type}`], { [styles['string-group__item--clickable']]: data.link })}>{!!data.title && <b>{data.title}:&nbsp;&nbsp;</b>}{`${data.text}`}</Label>;
                    if (data.link) {
                        return <Link key={data.link} to={data.link} target={data.external ? "_blank" : undefined} rel={data.external ? "noopener noreferrer" : undefined} >{content}</Link>;
                    }
                    return content;
                })}
            </div>
        </div>
    );
}

function ContentGroup({ data }: { data?: ContentGroupData; }) {
    return (
        !!data && data.group.length > 0 && <div className={styles['content-group']}>
            <Label as='h4' font='typo-primary-l-semibold'>{data.title}</Label>
            <div className={styles['content-group__scroll']}>
                <div className={styles['content-group__group']}>
                    {data.group.map((data) => {

                        const itemClass = classNames(styles['content-group__item'], { [styles['content-group__item--clickable']]: data.link, [styles['content-group__item--with-image']]: data.imgSrc });

                        const content = (
                            <>
                                {!!data.imgSrc && <Image src={data.imgSrc} className={styles['content-group__image']} />}
                                <div className={styles['content-group__text']}>
                                    <Label as='p' font='typo-primary-m-medium' className={styles['content-group__title']} >{data.title}</Label>
                                    <Label as='p' font='typo-primary-m-medium' className={styles['content-group__desc']} >{data.desc}</Label>
                                </div>
                            </>
                        );

                        if (data.link) {
                            return <Link className={itemClass} key={data.link} to={data.link} target={data.external ? "_blank" : undefined} rel={data.external ? "noopener noreferrer" : undefined} >{content}</Link>;
                        }

                        return (
                            <div key={data.title} className={itemClass}>
                                {content}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default MediaContent;