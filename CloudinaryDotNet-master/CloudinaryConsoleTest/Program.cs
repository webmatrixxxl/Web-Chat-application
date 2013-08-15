using System;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace CloudinaryConsoleTest
{
    public class Program
    {
        static Account m_account;
        static CloudinaryDotNet.Cloudinary m_cloudinary;
        static string m_testImagePath;

        public static void Initialize()
        {
            m_account = new Account("di8r1zqr2", "666225456753559", "KhP33_rzpljTjMtyvt7zUux7W_M");
            m_cloudinary = new CloudinaryDotNet.Cloudinary(m_account);
            m_testImagePath = "../../80668-its-a-trap.png";
        }

        static void Main(string[] args)
        {
            Initialize();

            ImageUploadParams uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(m_testImagePath)
            };

            ImageUploadResult uploadResult = m_cloudinary.Upload(uploadParams);

            Console.WriteLine(uploadResult.Uri);
        }
    }
}