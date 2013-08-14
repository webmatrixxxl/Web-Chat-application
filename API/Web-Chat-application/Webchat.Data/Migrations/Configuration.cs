namespace Webchat.Data.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using Webchat.Data;
    using Webchat.Models;

    public sealed class Configuration : DbMigrationsConfiguration<WebchatContext>
    {
        public Configuration()
        {
            this.AutomaticMigrationsEnabled = true;
            this.AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(WebchatContext context)
        {
            var user = new User()
            {
                Nickname = "User #1",
                Password = "18f50456fe3f3ffd7b4360786fc26489a4db8a16",
                Email = "user@mail",
                ImageUrl = "Image url"
            };

            var contact = new User()
            {
                Nickname = "Contact",
                Password = "18f50456fe3f3ffd7b4360786fc26489a4db8a16",
                Email = "contact@mail",
                ImageUrl = "Image url"
            };

            user.Contacts.Add(contact);
            context.Users.AddOrUpdate(x => x.Nickname, user);
            
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}
