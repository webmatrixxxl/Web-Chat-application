using System;
using System.Collections.Generic;
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
    public class FilesController : ApiController
    {
         private IRepository<File> data;

        public FilesController()
        {
            this.data = new DbFilesRepository(new WebchatContext());
        }

        public FilesController(IRepository<File> repository)
        {
            if (repository == null)
            {
                throw new ArgumentNullException("Invalid repository! It cannot be null!");
            }

            this.data = repository;
        }

        // GET api/users
        public IQueryable<FileModel> Get()
        {
            var allFileModels = this.data.All().Select(FileModel.FromFile);

            return allFileModels;
        }

        // GET api/users/5
        public FileModel Get(int id)
        {
            var file = this.data.Get(id);
            var fileModel = FileModel.CreateModel(file);

            return fileModel;
        }

        // POST api/users
        public HttpResponseMessage Post([FromBody]FileModel model)
        {
            if (!ModelState.IsValid)
            {
                var error = this.Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Invalid file model!");
                return error;
            }

            File file = model.ToFile();
            this.data.Add(file);

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
