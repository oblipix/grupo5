using Microsoft.AspNetCore.Mvc;

namespace ViagemImpacta.Controllers
{
    public class TravelPackagesController : Controller
    {
        public IActionResult Index([FromQuery] int skip = 0, [FromQuery] int take = 10)
        {
            //RETORNA LISTA DE PACOTES
            return View();
        }

        public IActionResult Details(int id)
        {
            //MOSTRA PACOTE EM DETALHES -> PEGA POR ID
            return View();
        }

        //TALVEZ DÊ PARA USAR DTO
        //[HttpPost]
        //public IActionResult Create()
        //{
        //    //ENVIA DIRETO PELO FORMULÁRIO
        //    return View();
        //}

        public IActionResult Edit()
        {
            return View();
        }

        //public IActionResult Edit()
        //{
        //    return View();
        //}

        public IActionResult Delete()
        {
            return View();
        }

        public IActionResult DeleteConfirmed()
        {
            return View();
        }
    }
}
