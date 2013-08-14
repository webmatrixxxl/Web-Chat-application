namespace Webchat.WebApi.Models
{
    using System;
    using System.Linq;
    using System.Linq.Expressions;
    using Webchat.Models;

    public class FileModel
    {
        public FileModel()
        {
        }

        public FileModel(int id, string title, string url)
        {
            this.Id = id;
            this.Title = title;
            this.Url = url;
        }

        public int Id { get; set; }

        public string Title { get; set; }

        public string Url { get; set; }

        public int SenderId { get; set; }

        public UserModel Sender { get; set; }

        public static Expression<Func<File, FileModel>> FromFile
        {
            get
            {
                return x => new FileModel { Id = x.Id, Title = x.Title, Url = x.Url, Sender = UserModel.CreateModel(x.Sender), SenderId = x.SenderId };
            }
        }

        public File ToFile()
        {
            File user = new File()
            {
                Id = this.Id,
                Title = this.Title,
                Url = this.Url,
                Sender = this.Sender.ToUser(),
                SenderId = Sender.Id,
            };

            return user;
        }

        public static FileModel CreateModel(File file)
        {
            FileModel model = new FileModel(file.Id, file.Title, file.Url);
            model.Sender = UserModel.CreateModel(file.Sender);
            model.SenderId = file.SenderId;

            return model;
        }
    }
}