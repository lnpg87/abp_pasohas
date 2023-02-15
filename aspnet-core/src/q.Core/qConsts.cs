using q.Debugging;

namespace q
{
    public class qConsts
    {
        public const string LocalizationSourceName = "q";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "0ccedc63b8bb44e7875830825b54601a";
    }
}
