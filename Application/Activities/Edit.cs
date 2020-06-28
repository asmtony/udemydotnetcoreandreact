using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistance;

namespace Application.Activities
{
  public class Edit
  {
    public class Command : IRequest
    {
      public Guid Id { get; set; }
      public string Title { get; set; }
      public string Description { get; set; }
      public string Category { get; set; }
      public DateTime? Date { get; set; }
      public string City { get; set; }
      public string Venue { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
      private readonly DataContext _context;
      public Handler(DataContext context)
      {
        _context = context;
      }

      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        //throw new Exception($"ID: {request.Id} ");
        // handler logic     
        var activity = await _context.Activities.FindAsync(request.Id);

        if (activity == null)
          throw new Exception("Could not find Activity");
        //Console.WriteLine(activity.ToString());
        activity.Title = request.Title ?? activity.Title;
        activity.Description = request.Description ?? activity.Description;
        activity.Category = request.Category ?? activity.Category;
        activity.Date = request.Date ?? activity.Date;
        activity.City = request.Title ?? activity.Title;
        activity.Venue = request.Title ?? activity.Title;

        try
        {
          var success = await _context.SaveChangesAsync() > 0;
          return Unit.Value;
        }
        catch (Exception e)
        {
          throw new Exception("Problem saving changes: " + e.Message);
        }
      }
    }
  }
}