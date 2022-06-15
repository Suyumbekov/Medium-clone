-- Branch testing-reaction
-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    username character varying COLLATE pg_catalog."default" NOT NULL,
    password_hash character varying COLLATE pg_catalog."default" NOT NULL,
    avatar_url character varying COLLATE pg_catalog."default",
    bio character varying COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

-- Table: public.blogs

-- DROP TABLE IF EXISTS public.blogs;

CREATE TABLE IF NOT EXISTS public.blogs
(
    id integer NOT NULL DEFAULT nextval('blogs_id_seq'::regclass),
    "user_id" integer NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    description character varying COLLATE pg_catalog."default",
    CONSTRAINT blogs_pkey PRIMARY KEY (id),
    CONSTRAINT "user_id" FOREIGN KEY ("user_id")
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.blogs
    OWNER to postgres;

    -- Table: public.posts

-- DROP TABLE IF EXISTS public.posts;

CREATE TABLE IF NOT EXISTS public.posts
(
    id integer NOT NULL DEFAULT nextval('posts_id_seq'::regclass),
    "blog_id" integer NOT NULL,
    "user_id" integer NOT NULL,
    title character varying COLLATE pg_catalog."default" NOT NULL,
    subtitle character varying COLLATE pg_catalog."default",
    "content_markup" text COLLATE pg_catalog."default" NOT NULL,
    "is_large_preview" boolean NOT NULL,
    "img_descriptor" character varying COLLATE pg_catalog."default" NOT NULL,
    date character varying COLLATE pg_catalog."default",
    "read_time_estimate" character varying COLLATE pg_catalog."default",
    CONSTRAINT "post-id" PRIMARY KEY (id),
    CONSTRAINT "blog_id" FOREIGN KEY ("blog_id")
        REFERENCES public.blogs (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "user_id" FOREIGN KEY ("user_id")
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.posts
    OWNER to postgres;
-- Index: fki_blog_id

-- DROP INDEX IF EXISTS public."fki_blog_id";

CREATE INDEX IF NOT EXISTS "fki_blog_id"
    ON public.posts USING btree
    ("blog_id" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_user_id

-- DROP INDEX IF EXISTS public."fki_user_id";

CREATE INDEX IF NOT EXISTS "fki_user_id"
    ON public.posts USING btree
    ("user_id" ASC NULLS LAST)
    TABLESPACE pg_default;

    -- Table: public.revoked_tokens

-- DROP TABLE IF EXISTS public.revoked_tokens;

CREATE TABLE IF NOT EXISTS public.revoked_tokens
(
    id integer NOT NULL DEFAULT nextval('revoked_tokens_id_seq'::regclass),
    token character varying COLLATE pg_catalog."default",
    CONSTRAINT revoked_tokens_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.revoked_tokens
    OWNER to postgres;
