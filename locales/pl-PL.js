export default async () => {
    return (await import(/* webpackChunkName: "locale.pl" */ `./locale.pl.yml`)).default;
}
