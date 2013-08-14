using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Webchat.Data;
using Webchat.Models;
using Webchat.WebApi.Models;

namespace Testing
{
    class Program
    {
        static void Main(string[] args)
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<WebchatContext, Webchat.Data.Migrations.Configuration>());
            var context = new WebchatContext();

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("http://localhost:27653/");
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            FileModel file = new FileModel(0, "File Title", "file url");
            //var dbUser = client.GetAsync("api/users/1").Result.Content.ReadAsAsync<UserDetails>().Result;

            file.Sender = new UserModel()
            {
                Id = 0,
                Nickname = "User #1",
                Email = "mail",
                ImageUrl = "imageUrl"
            };

            var response = client.PostAsJsonAsync("api/files", file).Result;
            Console.WriteLine("{0} - {1}", response.ReasonPhrase, response.StatusCode);
        }
    }
}
