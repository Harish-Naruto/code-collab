create table "public"."Collaborators" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null default gen_random_uuid(),
    "is_owner" boolean not null,
    "file_id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."Collaborators" enable row level security;

create table "public"."Users" (
    "id" uuid not null default gen_random_uuid(),
    "email" character varying not null,
    "name" character varying not null,
    "username" character varying not null,
    "avatar_url" text,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."Users" enable row level security;

create table "public"."files" (
    "id" uuid not null default gen_random_uuid(),
    "file_name" character varying not null,
    "owner_id" uuid not null default gen_random_uuid(),
    "Language" character varying not null,
    "content" text default ''::text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."files" enable row level security;

CREATE UNIQUE INDEX "Collaborators_file_id_key" ON public."Collaborators" USING btree (file_id);

CREATE UNIQUE INDEX "Collaborators_pkey" ON public."Collaborators" USING btree (id);

CREATE UNIQUE INDEX "Collaborators_user_id_key" ON public."Collaborators" USING btree (user_id);

CREATE UNIQUE INDEX "Users_email_key" ON public."Users" USING btree (email);

CREATE UNIQUE INDEX "Users_pkey" ON public."Users" USING btree (id);

CREATE UNIQUE INDEX files_owner_id_key ON public.files USING btree (owner_id);

CREATE UNIQUE INDEX files_pkey ON public.files USING btree (id);

alter table "public"."Collaborators" add constraint "Collaborators_pkey" PRIMARY KEY using index "Collaborators_pkey";

alter table "public"."Users" add constraint "Users_pkey" PRIMARY KEY using index "Users_pkey";

alter table "public"."files" add constraint "files_pkey" PRIMARY KEY using index "files_pkey";

alter table "public"."Collaborators" add constraint "Collaborators_file_id_fkey" FOREIGN KEY (file_id) REFERENCES files(id) ON DELETE CASCADE not valid;

alter table "public"."Collaborators" validate constraint "Collaborators_file_id_fkey";

alter table "public"."Collaborators" add constraint "Collaborators_file_id_key" UNIQUE using index "Collaborators_file_id_key";

alter table "public"."Collaborators" add constraint "Collaborators_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "Users"(id) ON DELETE CASCADE not valid;

alter table "public"."Collaborators" validate constraint "Collaborators_user_id_fkey";

alter table "public"."Collaborators" add constraint "Collaborators_user_id_key" UNIQUE using index "Collaborators_user_id_key";

alter table "public"."Users" add constraint "Users_email_key" UNIQUE using index "Users_email_key";

alter table "public"."files" add constraint "files_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES "Users"(id) ON DELETE CASCADE not valid;

alter table "public"."files" validate constraint "files_owner_id_fkey";

alter table "public"."files" add constraint "files_owner_id_key" UNIQUE using index "files_owner_id_key";

grant delete on table "public"."Collaborators" to "anon";

grant insert on table "public"."Collaborators" to "anon";

grant references on table "public"."Collaborators" to "anon";

grant select on table "public"."Collaborators" to "anon";

grant trigger on table "public"."Collaborators" to "anon";

grant truncate on table "public"."Collaborators" to "anon";

grant update on table "public"."Collaborators" to "anon";

grant delete on table "public"."Collaborators" to "authenticated";

grant insert on table "public"."Collaborators" to "authenticated";

grant references on table "public"."Collaborators" to "authenticated";

grant select on table "public"."Collaborators" to "authenticated";

grant trigger on table "public"."Collaborators" to "authenticated";

grant truncate on table "public"."Collaborators" to "authenticated";

grant update on table "public"."Collaborators" to "authenticated";

grant delete on table "public"."Collaborators" to "service_role";

grant insert on table "public"."Collaborators" to "service_role";

grant references on table "public"."Collaborators" to "service_role";

grant select on table "public"."Collaborators" to "service_role";

grant trigger on table "public"."Collaborators" to "service_role";

grant truncate on table "public"."Collaborators" to "service_role";

grant update on table "public"."Collaborators" to "service_role";

grant delete on table "public"."Users" to "anon";

grant insert on table "public"."Users" to "anon";

grant references on table "public"."Users" to "anon";

grant select on table "public"."Users" to "anon";

grant trigger on table "public"."Users" to "anon";

grant truncate on table "public"."Users" to "anon";

grant update on table "public"."Users" to "anon";

grant delete on table "public"."Users" to "authenticated";

grant insert on table "public"."Users" to "authenticated";

grant references on table "public"."Users" to "authenticated";

grant select on table "public"."Users" to "authenticated";

grant trigger on table "public"."Users" to "authenticated";

grant truncate on table "public"."Users" to "authenticated";

grant update on table "public"."Users" to "authenticated";

grant delete on table "public"."Users" to "service_role";

grant insert on table "public"."Users" to "service_role";

grant references on table "public"."Users" to "service_role";

grant select on table "public"."Users" to "service_role";

grant trigger on table "public"."Users" to "service_role";

grant truncate on table "public"."Users" to "service_role";

grant update on table "public"."Users" to "service_role";

grant delete on table "public"."files" to "anon";

grant insert on table "public"."files" to "anon";

grant references on table "public"."files" to "anon";

grant select on table "public"."files" to "anon";

grant trigger on table "public"."files" to "anon";

grant truncate on table "public"."files" to "anon";

grant update on table "public"."files" to "anon";

grant delete on table "public"."files" to "authenticated";

grant insert on table "public"."files" to "authenticated";

grant references on table "public"."files" to "authenticated";

grant select on table "public"."files" to "authenticated";

grant trigger on table "public"."files" to "authenticated";

grant truncate on table "public"."files" to "authenticated";

grant update on table "public"."files" to "authenticated";

grant delete on table "public"."files" to "service_role";

grant insert on table "public"."files" to "service_role";

grant references on table "public"."files" to "service_role";

grant select on table "public"."files" to "service_role";

grant trigger on table "public"."files" to "service_role";

grant truncate on table "public"."files" to "service_role";

grant update on table "public"."files" to "service_role";

create policy "Enable delete for users based on user_id"
on "public"."Collaborators"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable insert for users based on user_id"
on "public"."Collaborators"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable users to view their own data only"
on "public"."Collaborators"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable insert for users based on user_id"
on "public"."Users"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = id));


create policy "Enable update for users based on email"
on "public"."Users"
as permissive
for update
to public
using (((( SELECT auth.jwt() AS jwt) ->> 'email'::text) = (email)::text))
with check (((( SELECT auth.jwt() AS jwt) ->> 'email'::text) = (email)::text));


create policy "Enable users to view their own data only"
on "public"."Users"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = id));


create policy "Collaborators can update their files"
on "public"."files"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) IN ( SELECT "Collaborators".user_id
   FROM "Collaborators"
  WHERE ("Collaborators".file_id = files.id))));


create policy "Enable delete for users based on user_id"
on "public"."files"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = owner_id));


create policy "Enable read access for collaborators "
on "public"."files"
as permissive
for select
to public
using ((( SELECT auth.uid() AS uid) IN ( SELECT "Collaborators".user_id
   FROM "Collaborators"
  WHERE ("Collaborators".file_id = files.id))));



