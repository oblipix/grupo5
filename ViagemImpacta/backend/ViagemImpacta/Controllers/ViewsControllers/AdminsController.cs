using Microsoft.AspNetCore.Mvc;

namespace ViagemImpacta.Controllers.ViewsControllers
{
    public class AdminController : Controller
    {
        

        public IActionResult Dashboard()
        {
            return View();
        }
    }
}
