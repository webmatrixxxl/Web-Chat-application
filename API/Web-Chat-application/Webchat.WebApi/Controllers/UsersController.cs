using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Webchat.Data;
using Webchat.Models;
using Webchat.Repositories;
using Webchat.WebApi.Models;


namespace Webchat.WebApi.Controllers
{
    public class UsersController : ApiController
    {
        private IRepository<User> data;

        public UsersController()
        {
            this.data = new DbUsersRepository(new WebchatContext());
        }

        public UsersController(IRepository<User> repository)
        {
            if (repository == null)
            {
                throw new ArgumentNullException("Invalid repository! It cannot be null!");
            }

            this.data = repository;
        }

        // GET api/users
        public IQueryable<UserModel> Get()
        {
            var allUserModels = this.data.All().Select(UserModel.FromUser);

            return allUserModels;
        }

        // GET api/users/5
        public UserDetails Get(int id)
        {
            var user = this.data.Get(id);
            var userModel = UserDetails.CreateModel(user);

            return userModel;
        }

        // POST api/users
        public HttpResponseMessage Post([FromBody]UserModel model)
        {
            if (!ModelState.IsValid)
            {
                var error = this.Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Invalid user model!");
                return error;
            }

            User user = model.ToUser();
            this.data.Add(user);

            var response = this.Request.CreateResponse(HttpStatusCode.Created, "User created successfully");
            return response;
        }

        // PUT api/users/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/users/5
        public void Delete(int id)
        {
        }
    }
}
