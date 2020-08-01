using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Interfaces;
using Domain;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Security
{
  public class JwtGenerator : IJwtGenerator
  {
    public readonly SymmetricSecurityKey _key;
    public JwtGenerator(IConfiguration configuration)
    {
      _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["TokenKey"]));
    }
    public string CreateToken(AppUser appUser)
    {
      // Use https://jwt.io/ for viewing token data
      // Build list of claims
      var claims = new List<Claim>
      {
          new Claim(JwtRegisteredClaimNames.NameId, appUser.UserName)
      };
      // generate signing credentials to use
      //var keyBytes = Encoding.UTF8.GetBytes();
      //--var key = new SymmetricSecurityKey(keyBytes);
      var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.Now.AddDays(7),
        SigningCredentials = creds
      };

      var tokenHandler = new JwtSecurityTokenHandler();

      var token = tokenHandler.CreateToken(tokenDescriptor);
      return tokenHandler.WriteToken(token);
    }
  }
}