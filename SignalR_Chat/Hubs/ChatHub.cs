using Microsoft.AspNetCore.SignalR;

namespace SignalR_Chat
{
    public class ChatHub : Hub
    {
        public async Task Message_To_Server(string user, string message)
        {
            await Clients.All.SendAsync("Message_To_Client", user, message);
        }
    }
}
