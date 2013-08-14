namespace Webchat.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Webchat.Models;

    public class DbUsersRepository : IRepository<User>
    {
        public DbUsersRepository(DbContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException("Invalid database context! It cannot be null!");
            }

            this.Context = context;
            this.DbSet = this.Context.Set<User>();
        }

        protected DbContext Context { get; set; }
        protected DbSet<User> DbSet { get; set; }

        public IQueryable<User> All()
        {
            var allUsers = this.DbSet;

            return allUsers;
        }

        public User Get(int id)
        {
            if (id < 0)
            {
                throw new ArgumentOutOfRangeException("Id must be positive integer number!");
            }

            var user = this.DbSet.Where(x => x.Id == id).FirstOrDefault();

            return user;
        }

        public User Add(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException("Invalid user! It cannot be null!");
            }

            this.DbSet.Add(user);
            this.Context.SaveChanges();

            return user;
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public void Update(int id, User item)
        {
            throw new NotImplementedException();
        }
    }
}
