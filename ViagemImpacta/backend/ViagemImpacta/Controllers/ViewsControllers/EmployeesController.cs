using Microsoft.AspNetCore.Mvc;

namespace ViagemImpacta.Controllers.ViewsControllers
{
    public class EmployeesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
