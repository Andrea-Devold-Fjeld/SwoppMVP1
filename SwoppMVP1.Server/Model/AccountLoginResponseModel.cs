﻿using Microsoft.AspNetCore.Identity;

namespace SwoppMVP1.Server.Model
{
    public class AccountLoginResponseModel //: ResponseBaseModel #TODO: Implement ResponseBaseModel
    {
        public string Token { get; set; }
        public DateTime Expire { get; set; }
    }
}