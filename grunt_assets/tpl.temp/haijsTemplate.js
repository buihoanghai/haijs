var haijsTemplate = {};

haijsTemplate["_tpl/haijs"] = "<div class=\"haijs\">\n" +
   "  \n" +
   "</div>";

haijsTemplate["notification/_tpl/notification"] = "<div class=\"haijs\">\n" +
   "  asdasdasdasdasdasd\n" +
   "</div> ";

haijsTemplate["scenario/_tpl/scenario"] = "<div class=\"scenario\">\n" +
   "  <h3>Scenario</h3>\n" +
   "  <div class=\"list-node\">\n" +
   "    <div vi-repeat=\"item in nodes\">\n" +
   "      <div vi-bind=\"item.time\"></div>\n" +
   "    </div>\n" +
   "  </div>\n" +
   "  <section>\n" +
   "\n" +
   "    <div>\n" +
   "      <label>Target</label>\n" +
   "      <input type=\"text\" name=\"target\" vi-model=\"target\"/>\n" +
   "    </div>\n" +
   "  </section>\n" +
   "  <button vi-click=\"playBack\">plack back</button>\n" +
   "\n" +
   "</div> ";
