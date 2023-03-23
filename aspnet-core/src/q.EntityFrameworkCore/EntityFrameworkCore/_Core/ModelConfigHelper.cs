using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace q.EntityFrameworkCore._Core
{
    public class ModelConfigHelper
    {
        public static void Configurar(string nameSpace, ModelBuilder builder)
        {
            var lista = AppDomain
            .CurrentDomain
            .GetAssemblies()
            .SelectMany(x => x.GetTypes())
            .Where(x =>
                typeof(IModelConfig).IsAssignableFrom(x) &&
                !x.IsInterface &&
                !x.IsAbstract &&
                x.Namespace.Equals(nameSpace, StringComparison.CurrentCultureIgnoreCase)
                )
            .ToList();

            foreach (var item in lista)
            {
                var x = (IModelConfig)Activator.CreateInstance(item);
                x.Configurar(builder);
            }
        }
    }
}
