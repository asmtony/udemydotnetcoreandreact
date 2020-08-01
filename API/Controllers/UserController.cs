using System;
using System.Threading.Tasks;
using Application.User;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class UserController : BaseController
  {
    [AllowAnonymous]
    [HttpPost("Login")]
    public async Task<ActionResult<User>> Login(LogIn.Query query)
    {
      //throw new Exception("Hello");
      return await Mediator.Send(query);
    }
    [AllowAnonymous]
    [HttpPost("Register")]
    public async Task<ActionResult<User>> Register(Register.Command command)
    {
      //throw new Exception("Hello");
      return await Mediator.Send(command);
    }

    [HttpGet]
    public async Task<ActionResult<User>> CurrentUser()
    {
      return await Mediator.Send(new CurrentUser.Query());
    }
  }
}