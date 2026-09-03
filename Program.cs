using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.Web.Caching;
using SixLabors.ImageSharp.Web.Commands;
using SixLabors.ImageSharp.Web.DependencyInjection;
using SixLabors.ImageSharp.Web.Processors;
using Smidge;
using Smidge.Options;
using Umbraco.Cms.Web.Common.ApplicationBuilder;

var builder = WebApplication.CreateBuilder(args);

builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddWebsite()
    .AddDeliveryApi()
    .AddComposers()
    .Build();

builder.Services.AddSmidge(builder.Configuration);

builder.Services.AddImageSharp(options =>
{
    options.BrowserMaxAge = TimeSpan.FromDays(365);
    options.CacheMaxAge = TimeSpan.FromDays(365);
})
.AddProcessor<ResizeWebProcessor>()
.AddProcessor<FormatWebProcessor>()
.SetRequestParser<QueryCollectionRequestParser>()
.Configure<PhysicalFileSystemCacheOptions>(options =>
{
    options.CacheFolder = "App_Data/Cache/ImageSharp";
});

SixLabors.ImageSharp.Configuration.Default.ImageFormatsManager.SetEncoder(
    WebpFormat.Instance,
    new WebpEncoder
    {
        Quality = 80,
        FileFormat = WebpFileFormatType.Lossy
    });

var app = builder.Build();

await app.BootUmbracoAsync();

app.UseHttpsRedirection();

app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        const int duration = 60 * 60 * 24 * 365;
        ctx.Context.Response.Headers["Cache-Control"] =
            "public,max-age=" + duration + ",immutable";
    }
});

app.UseImageSharp();

app.UseUmbraco()
    .WithMiddleware(u =>
    {
        u.UseBackOffice();
        u.UseWebsite();
    })
    .WithEndpoints(u =>
    {
        u.UseBackOfficeEndpoints();
        u.UseWebsiteEndpoints();
    });

app.UseSmidge(bundles =>
{
    bundles.CreateJs("js-application", "~/scripts/scripts.js");
    bundles.CreateCss("css-application", "~/styles/styles.css");
});

await app.RunAsync();
