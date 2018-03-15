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
        [HttpGet("[action]")]
        public IEnumerable<Item> Items()
        {
            return ItemsList;
        }

        [HttpPost("[action]")]
        public IEnumerable<Item> Add([FromBody] ItemRepresentation postData)
        {
            if(postData.parent > -1){
                // childnode
                Item parent = Item.findById(ItemsList, postData.parent);
                Item newItem = new Item(counter++, parent, postData.description, postData.dueDate, false, postData.detail);
                return ItemsList;
            }
            else {
                //only top-level
                Item newItem = new Item(counter++, postData.description, postData.dueDate, false, postData.detail);
                ItemsList.Add(newItem);
                return ItemsList;
            }
        }

        [HttpPost("[action]")]
        public IEnumerable<Item> MarkDone([FromBody] ItemRepresentation item)
        {
            // Find by id in ItemsList
            Item current = Item.findById(ItemsList, item.id);

            // If an item was found, mark it and all its children as done
            if(current != null){
                current.markDone();
            }

            return ItemsList;
        }

        [HttpPost("[action]")]
        public IEnumerable<Item> Delete([FromBody] ItemRepresentation item)
        {
            Item.removeItem(ItemsList, item.id);
            return ItemsList;
        }

        [HttpGet("[action]")]
        public IEnumerable<Item> DeleteAll()
        {
            ItemsList.Clear();
            return ItemsList;
        }

        // Everything below is just to simulate a database table of items
        // and give us some mock data to look at. Normally we'd use a database and
        // some ORM to do this bit if it weren't just a prototype.
        [Serializable()]
        public class Item {
            public int id;
            public string description;
            public int parent;
            public List<Item> children;
            public bool isDone;
            public DateTime dueDate;
            public string detail;

            public Item(int counter, string desc, DateTime due, bool isDone, string detail = ""){
                this.id = counter;
                this.description = desc;
                this.dueDate = due;
                this.parent = -1;
                this.children = new List<Item>();
                this.isDone = false;
                this.detail = detail;
            }

            public Item(int counter, Item parent, string desc, DateTime due, bool isDone, string detail = ""){
                this.id = counter;
                this.description = desc;
                this.dueDate = due;
                this.children = new List<Item>();
                this.isDone = false;
                this.detail = detail;
                this.parent = parent.id;
                parent.children.Add(this);
            }

            public void markDone(){
                this.isDone = true;
                markChildrenDone();

                if(this.parent > -1){
                    checkParentIsDone();
                }
            }

            public void markChildrenDone(){
                for(var i = 0; i < this.children.Count; i++){
                    this.children[i].isDone = true;
                    for(var j = 0; j < this.children[i].children.Count; j++){
                        this.children[i].children[j].isDone = true;
                    }
                }
            }

            public void checkParentIsDone(){
                Item parentNode = Item.findById(ItemsList, this.parent);

                if(parentNode != null){
                    for(var i = 0; i < parentNode.children.Count; i++){
                        if(!parentNode.children[i].isDone){
                            return;
                        }
                    }

                    // All other subtasks are done, let's mark
                    // the parent node done as well
                    parentNode.markDone();
                }
            }

            public static void removeItem(List<Item> list, int id){
                for(var i = 0; i < list.Count; i++){
                    if(list[i].id == id){
                        list.RemoveAt(i);
                        return;
                    }
                    for(var j = 0; j < list[i].children.Count; j++){
                        if(list[i].children[j].id == id){
                            list[i].children.RemoveAt(j);
                            return;
                        }
                        for(var k = 0; k < list[i].children[j].children.Count; k++){
                            if(list[i].children[j].children[k].id == id){
                                list[i].children[j].children.RemoveAt(k);
                                return;
                            }
                        }
                    }
                }
            }

            public static Item findById(List<Item> list, int id){
                for(var i = 0; i < list.Count; i++){
                    if(list[i].id == id){
                        return list[i];
                    }
                    for(var j = 0; j < list[i].children.Count; j++){
                        if(list[i].children[j].id == id){
                            return list[i].children[j];
                        }
                        for(var k = 0; k < list[i].children[j].children.Count; k++){
                            if(list[i].children[j].children[k].id == id){
                                return list[i].children[j].children[k];
                            }
                        }
                    }
                }
                return null;
            }
        }

        // Because I don't have time to look up details on serializing List<T>
        [Serializable()]
        public class ItemRepresentation {
            public int id;
            public string description;
            public int parent;
            public DateTime dueDate;
            public string detail;
        }

        // Mock data (in lieu of DB)
        private static int counter = 1;
        private static Item item1 = new Item(counter++, "Test Item 1", DateTime.Now, false, "Here is some detail about test 1");
        private static Item item2 = new Item(counter++, "Test Item 2", DateTime.Now.AddDays(1), false);
        private static Item item3 = new Item(counter++, "Test Item 3", DateTime.Now.AddDays(-1), true);
        private static Item item4 = new Item(counter++, item2, "Test Item 4", DateTime.Now.AddDays(1), true, "A detail");
        private static Item item5 = new Item(counter++, item2, "Test Item 5", DateTime.Now.AddDays(-1), true, "Another detail");
        private static Item item6 = new Item(counter++, item4, "Test Item 6", DateTime.Now, true, "A detail");
        private static List<Item> ItemsList = new List<Item>()
        {
            item1, item2, item3
        };
    }
}
