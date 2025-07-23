using Microsoft.AspNetCore.Mvc;

namespace ViagemImpacta.Controllers.ViewsControllers
{
    public class AdminsController : Controller
    {
        public IActionResult Dashboard()
        {
            return View();
        }
    }
}
