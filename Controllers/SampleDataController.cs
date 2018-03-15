using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace roadtrip.Controllers
{
    [Route("api/[controller]")]
    public class FakeDBController : Controller
    {

        // Item class
        [Serializable()]
        public class Item {
            public int id;
            public string description;
            public int parent;
            public Item[] children;
            public bool isDone;
            public DateTime dueDate;

            public Item(int counter, string desc, DateTime due, bool isDone, int parent){
                this.id = counter;
                this.description = desc;
                this.dueDate = due;
                this.parent = parent;
                this.children = new Item[0];
                this.isDone = false;
            }
        }

        // Mock data (in lieu of DB)
        private static int counter = 1;
        private static Item item1 = new Item(counter++, "Test Item 1", DateTime.Now, false, -1);
        private static Item item2 = new Item(counter++, "Test Item 2", DateTime.Now.AddDays(1), false, -1);
        private static Item item3 = new Item(counter++, "Test Item 3", DateTime.Now.AddDays(-1), true, -1);
        private static Item[] ItemsList = new[]
        {
            item1, item2, item3
        };

        [HttpGet("[action]")]
        public IEnumerable<Item> Items()
        {
            return ItemsList;
        }

        [HttpPost("[action]")]
        public Item Add([FromBody] Item postData)
        {
            Console.WriteLine("POST!");
            Console.WriteLine(postData.dueDate);
            Console.WriteLine("END");
            Item newItem = new Item(counter++, postData.description, postData.dueDate, false, postData.parent);
            return newItem;
        }
    }
}
