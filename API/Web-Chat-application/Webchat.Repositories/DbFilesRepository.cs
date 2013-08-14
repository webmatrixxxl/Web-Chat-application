namespace Webchat.Repositories
{
    using System;
    using System.Data.Entity;
    using System.Linq;
    using Webchat.Models;

    public class DbFilesRepository : IRepository<File>
    {
        public DbFilesRepository(DbContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException("Invalid database context! It cannot be null!");
            }

            this.Context = context;
            this.DbSet = this.Context.Set<File>();
        }

        protected DbContext Context { get; set; }
        protected DbSet<File> DbSet { get; set; }

        public IQueryable<File> All()
        {
            var allFiles = this.DbSet;

            return allFiles;
        }

        public File Get(int id)
        {
            if (id < 0)
            {
                throw new ArgumentOutOfRangeException("Id must be positive integer number!");
            }

            var file = this.DbSet.Where(x => x.Id == id).FirstOrDefault();

            return file;
        }

        public File Add(File file)
        {
            if (file == null)
            {
                throw new ArgumentNullException("Invalid file! It cannot be null!");
            }

            var dbSender = this.Context.Set<User>().Where(x => x.Nickname == file.Sender.Nickname).FirstOrDefault();
            file.Sender = dbSender;

            this.DbSet.Add(file);
            this.Context.SaveChanges();

            return file;
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public void Update(int id, File item)
        {
            throw new NotImplementedException();
        }
    }
}
