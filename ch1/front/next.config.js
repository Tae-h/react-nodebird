//const CompressionPlugin = require('compression-webpack-plugin'); // 압축된 파일을 만들어줌

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
    compress: true, // true --> CompressionPlugin 가 필요 없음
    webpack(config, { webpack }) {
        const prod = process.env.NODE_ENV === 'production';
        //const plugins = [...config.plugins];

        /*if ( prod ) {
            plugins.push(new CompressionPlugin());
        }*/
        return {
            ...config,
            mode: prod ? 'production' : 'development',
            devtool: prod ? 'hidden-source-map' : 'eval',
            plugins: [
                ...config.plugins, // 불변성 지켜줘야 함
                new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
            ],
        };
    },
});