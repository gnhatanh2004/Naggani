// === ELEMENTS ===
const bgEl = document.getElementById("background");
const charEl = document.getElementById("character");
const textEl = document.getElementById("text");
const menuEl = document.getElementById("menu");
const gameEl = document.getElementById("game");
const choiceBox = document.getElementById("choiceBox");
const dialogueBox = document.getElementById("dialogueBox");

// === STORAGE KEYS ===
const saveKey = "game_autosave";
const checkpointKey = "game_checkpoint";

// === ENDINGS ===
const endings = {
  A: { name: "Bad end: Lần này anh đoán sai rồi.", unlocked: false, index: 2 },
  B: { name: "Ending B - Phòng Sinh học", unlocked: false, index: 4 },
};

// === SCENES ===
const scenes = [
  { bg: "chuong1.jpg" }, // index 0
  { bg: "vanphong.jpg" }, // index 1
  { bg: "vanphong.jpg", char: "Narrator", text: "Văn phòng thám tử tư Heirlock vào buổi chiều mưa." }, // index 2
  { bg: "vanphong.jpg", char: "Narrator", text: "Có tiếng gõ cửa vang lên." }, // index 3
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Ai vậy?" }, // index 4
  { bg: "vanphong.jpg", char: "Narrator", text: "Cánh cửa gỗ chậm rãi mở ra, mang theo mùi ẩm mốc." }, // index 5
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Thám tử Siames Heirlock, tôi không làm phiền anh chứ?" }, // index 6
  { bg: "vanphong.jpg", char: "Narrator", text: "Bóng dáng quen thuộc của chàng cảnh sát Mainson xuất hiện." }, // index 7
  { bg: "vanphong.jpg", char: "Narrator", text: "Mainson là một cảnh sát thuộc đội điều tra chuyên án, đã từng là người đứng ra hợp tác với những thám tử tư khác để hỗ trợ giải quyết vụ án nhiều lần." }, // index 8
  { bg: "vanphong.jpg", char: "Narrator", text: "Mainson bước vào, chẳng chút ngần ngại mà thả mình lên chiếc ghế sofa ở giữa căn phòng, ném tập hồ sơ trên bàn rồi thở dài một tiếng." }, // index 9
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Để tôi đoán nhé, là vụ một giáo viên tiếng Nhật của trường K.K tử vong tại nhà riêng?" }, // index 10
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Anh nắm bắt thông tin nhanh thật." }, // index 11
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Tin tức lan nhanh lắm. Tôi đoán nạn nhân là Axton?" }, // index 12
  { bg: "vanphong.jpg", char: "Narrator", text: "Hắn đứng dậy, tiện tay rót cho mình một cốc cafe rồi đặt xuống trước mặt Mainson, mỉm cười." }, // index 13
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Cafe đen không đường không đá như bình thường, đúng chứ cảnh sát Mainson?" }, // index 14
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Đúng vậy, ngạc nhiên là anh vẫn còn nhớ khẩu vị đồ uống của tôi đấy." }, // index 15
  { bg: "vanphong.jpg", char: "Narrator", text: "Mainson nhận lấy cốc cafe rồi đưa lên uống trong khi vị thám tử đã bắt đầu lật tập hồ sơ, xem xét kĩ lưỡng." }, // index 16
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Nạn nhân là giáo viên tiếng Nhật, 42 tuổi tử vong tại căn hộ riêng. Hàng xóm báo thấy mùi lạ, cảnh sát phá cửa vào thì phát hiện thi thể trong phòng khách." }, // index 17
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Có dấu hiệu bị tấn công chứ?" }, // index 18
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Không. Không có vết thương rõ ràng, nguyên nhân cái chết là mất mấu và bị siết cổ, vùng kín đã hoàn toàn bị hủy hoại, cửa đã khóa từ bên trong." }, // index 19
  { bg: "vanphong.jpg", char: "Narrator", text: "Hắn tặc lưỡi, đây là một vụ án trong phòng kín." }, // index 20
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Khóa từ trong à..." }, // index 21
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Bọn tôi đã nghĩ tới việc nạn nhân bị cướp nhưng không có dấu hiệu nào cho thấy điều đó, tuy nhiên có một vài chi tiết kì lạ." }, // index 22
  { bg: "vanphong.jpg", char: "Narrator", text: "Như đã bắt được điều quan trọng, vị thám tử tư vươn người về phía trước để nghe rõ hơn." }, // index 23
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Chi tiết nào?" }, // index 24
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Một tách trà đổ trên bàn, tách còn lại còn nguyên vẹn, ghế bị kéo lệch, và một cuốn sổ ghi chép đặt ngay ngắn." }, // index 25
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Giống như hung thủ là người quen của nạn nhân vậy nên Axton mới chủ động mở cửa cho đối phương vào, thậm chí còn rót trà mời." }, // index 26
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Trà đổ, cuốn sổ ngay ngắn. Có vẻ như hung thủ đã chuẩn bị rất kĩ càng trước khi ra tay nên mọi thứ đều theo kế hoạch, nhanh gọn, hạn chế động chạm vào hiện trường." }, // index 27
  { bg: "vanphong.jpg", char: "Narrator", text: "Heirlock ngả người ra sau ghế, ánh mắt ánh lên tia tò mò." }, // index 28
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Cậu tới đây để cho tôi đi xem hiện trường, đúng chứ?" }, // index 29
  { bg: "vanphong.jpg", char: "Narrator", text: "Mainson bật cười, cậu gật đầu rồi lên tiếng." }, // index 30
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Đúng là không thể qua mắt anh được. Xe đang đợi dưới hầm rồi." }, // index 31
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Cho tôi ba phút. Tôi cần lấy áo khoác và vài thứ khác." }, // index 32
  { bg: "vanphong.jpg", char: "Narrator", text: "Mainson đứng dậy rồi bước ra khỏi văn phòng, bên ngoài, tiếng mưa dường như nặng hạt hơn khiến cậu có cảm giác bất an." }, // index 33
  { bg: "vanphong.jpg", char: "Narrator", text: "Cả hai rời khỏi tòa nhà của Heirlock, chiếc xe cảnh sát phóng đi giữa màn mưa dày đặc, chỉ còn ánh đèn chớp tắt liên tục trong một ngày đầu tuần." }, // index 34
  { bg: "hientruongAxton.jpg" }, // index 35
  { bg: "hientruongAxton.jpg", char: "Narrator", text: "Hai người dừng chân ở căn nhà nhỏ ở khu ngoại ô. Những dải ruy băng vàng chắn ngang lối vào, ánh đèn xanh đỏ nhấp nháy phản chiếu lên bức tường gạch men ẩm thấp đã cũ kỹ của nơi này." }, // index 36
  { bg: "hientruongAxton.jpg", char: "Mainson.png", text: "Đây, nhà của Axton. Cảnh sát vẫn đang giữ nguyên hiện trường." }, // index 37
  { bg: "hientruongAxton.jpg", char: "Heirlock.png", text: "Căn hộ nhỏ nhắn, đơn giản. Có vẻ như Axton sống một mình." }, // index 38
  { bg: "hientruongAxton.jpg", char: "Narrator", text: "Heirlock bước vào bên trong, ánh mắt nhanh chóng quét khắp hiện trường." }, // index 39
  { bg: "hientruongAxton.jpg", char: "Heirlock.png", text: "Mùi ẩm và hơi cũ. Giống căn hộ của người sống một mình lâu năm." }, // index 40
  { bg: "hientruongAxton.jpg", char: "Narrator", text: "Bàn ghế được sắp xếp ngăn nắp, chỉ có một vài vật dụng cá nhân đặt rải rác quanh phòng." }, // index 41
  { bg: "hientruongAxton.jpg", char: "Narrator", text: "Hắn cúi xuống nhìn qua vết đổ của tách trà. Đôi mắt vị thám tử khẽ nheo lại." }, // index 42
  { bg: "hientruongAxton.jpg", char: "Heirlock.png", text: "Trên cốc không có dấu tay?" }, // index 43
  { bg: "hientruongAxton.jpg", char: "Mainson.png", text: "Đúng thế, hai tách trà, một cho nạn nhân một cho hung thủ, hai người này có lẽ có quen biết từ trước, nhưng hung thủ không hề động vào cốc dù chỉ một chút trong khi chiếc đã đổ thì có dấu hiệu đã được nạn nhân sử dụng nhiều lần vào ngày xảy ra án mạng." }, // index 44
  { bg: "hientruongAxton.jpg", char: "Narrator", text: "Cả hai bước sâu hơn vào căn hộ. Cảnh sát hiện trường khẽ gật đầu chào khi thấy Mainson đi cùng Heirlock. Không gian tĩnh lặng, chỉ còn tiếng mưa rơi ngoài cửa sổ lặp đi lặp lại." }, // index 45
  { bg: "hientruongAxton.jpg", char: "Narrator", text: "Trên sàn phòng khách, thi thể người đàn ông trung niên nằm ngửa. Khuôn mặt tái nhợt, hai mắt mở trừng, cổ hằn rõ vết bầm tím dài ngoằng quanh yết hầu." }, // index 46
  { bg: "hientruongAxton.jpg", char: "Heirlock.png", text: "Bị siết cổ bằng dây mảnh… Có vẻ là dây vải, hoặc thắt lưng." }, // index 47
  { bg: "hientruongAxton.jpg", char: "Mainson.png", text: "Pháp y nói đó là sợi dây thừng nhỏ, loại chuyên dùng trong thể thao, đường kính khoảng hai ly. Không tìm thấy tại hiện trường." }, // index 48
  { bg: "hientruongAxton.jpg", char: "Heirlock.png", text: "Hung thủ mang theo, tức là đã có chuẩn bị." }, // index 49
  { bg: "hientruongAxton.jpg", char: "Narrator", text: "Heirlock cúi xuống, lật nhẹ phần cổ áo nạn nhân." }, // index 50
  { bg: "hientruongAxton.jpg", char: "Heirlock.png", text: "Vết siết nằm lệch một chút sang bên phải. Nghĩa là hung thủ thuận tay phải, đứng phía sau khi siết." }, // index 51
  { bg: "hientruongAxton.jpg", char: "Mainson.png", text: "Chính xác. Ngoài ra vùng kín bị rạch nhiều lần, có lẽ do thù oán cá nhân." }, // index 52
  { bg: "hientruongAxton.jpg", char: "Heirlock.png", text: "Thù oán cá nhân à, nghe cũng hợp lý đấy." }, // index 53
  { bg: "hientruongAxton.jpg", char: "Narrator", text: "Hắn đứng dậy, bước vòng quanh thi thể. Dưới chân nạn nhân, có một vệt trượt dài, in dấu bàn chân mờ mờ." }, // index 54
  { bg: "hientruongAxton.jpg", char: "Heirlock.png", text: "Dấu giày cỡ 41, kiểu đế da, không phải giày thể thao. Cũng không có bùn đất, hung thủ đến bằng ô tô, hoặc từ nơi rất gần đây." }, // index 55
  { bg: "hientruongAxton.jpg", char: "Mainson.png", text: "Cũng có khả năng là giày của chính nạn nhân." }, // index 56
  { bg: "hientruongAxton.jpg", char: "Heirlock.png", text: "Không đâu. Axton đi dép trong nhà mà, phải không?" }, // index 57
  { bg: "hientruongAxton.jpg", char: "Narrator", text: "Mainson im lặng một lúc, rồi mở tập hồ sơ." }, // index 58
  { bg: "hientruongAxton.jpg", char: "Mainson.png", text: "Đúng. Khi cảnh sát phá cửa, đôi dép vẫn để ngay ngắn bên kệ." }, // index 59
  { bg: "hientruongAxton.jpg", char: "Narrator", text: "Heirlock bước đến bàn, quan sát kỹ hai tách trà. Một tách đổ nghiêng, nước loang ra mặt bàn gỗ tạo thành vệt nhạt hình bán nguyệt." }, // index 60
  { bg: "hientruongAxton.jpg", char: "Narrator", text: "Hắn liếc qua cuốn sổ ghi chép đặt ngay ngắn trên bàn. Một trang bị gập lại cẩn thận, góc giấy hơi sờn." }, // index 61
  { bg: "hientruongAxton.jpg", char: "Heirlock.png", text: "Tôi có thể xem qua chứ?" }, // index 62
  { bg: "hientruongAxton.jpg", char: "Mainson.png", text: "Cứ tự nhiên." }, // index 63
  { bg: "hientruongAxton.jpg", char: "Narrator", text: "Heirlock lật trang giấy ra, chữ viết đều đặn ghi chép giờ giấc các buổi dạy, nhưng dòng cuối cùng dừng ở một câu cụt ngủn: “Trao đổi với Kael.”" }, // index 64
  { bg: "hientruongAxton.jpg", char: "Heirlock.png", text: "Kael?" }, // index 65
  { bg: "hientruongAxton.jpg", char: "Narrator", text: "Ánh mắt Heirlock lóe sáng." }, // index 66
  { bg: "hientruongAxton.jpg", char: "Heirlock.png", text: "Có ai trong vòng quan hệ bạn bè của nạn nhân có cái tên này không?" }, // index 67
  { bg: "hientruongAxton.jpg", char: "Mainson.png", text: "Kael. Giáo viên thể dục, đồng nghiệp của nạn nhân." }, // index 68
  { bg: "hientruongAxton.jpg", char: "Narrator", text: "Heirlock khẽ mỉm cười, đặt cuốn sổ lại vị trí cũ." }, // index 69
  { bg: "hientruongAxton.jpg", char: "Heirlock.png", text: "Có vẻ chúng ta đã biết người đầu tiên cần nói chuyện rồi." }, // index 70
  { bg: "hientruongAxton.jpg", char: "Narrator", text: "Ngoài trời, tiếng mưa dội mạnh hơn lên mái ngói. Trong căn phòng nhỏ, hương trà nhài và hơi lạnh của tử thi hòa vào nhau, mở đầu cho một vụ án tưởng chừng đơn giản nhưng lại ẩn chứa những sợi dây siết chặt họ hơn cả vết hằn trên cổ nạn nhân." }, // index 71
  { bg: "santruong.jpg" }, // index 72
  { bg: "santruong.jpg", char: "Narrator", text: "Trời vẫn chưa dứt mưa khi xe của Mainson dừng lại trước cổng trường K.K. Sân trường vắng vẻ, chỉ còn vài học sinh trú mưa dưới mái hiên. Nước mưa đọng trên tấm bảng tên trường phản chiếu ánh đèn xe chớp nháy, lạnh lẽo và yên ắng." }, // index 73
  { bg: "santruong.jpg", char: "Narrator", text: "Heirlock bước xuống, kéo cao cổ áo khoác, ánh mắt quét qua dãy hành lang dài hun hút." }, // index 74
  { bg: "santruong.jpg", char: "Mainson.png", text: "Kael đang ở trong phòng giáo viên. Anh ta dạy lớp Sinh học buổi chiều nhưng hôm nay xin nghỉ." }, // index 75
  { bg: "santruong.jpg", char: "Heirlock.png", text: "Tốt, ta không cần chen giữa đám học sinh." }, // index 76
  { bg: "phongsinhhoc.jpg" }, // index 77
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Phòng thực hành Sinh học có mùi hóa chất nhè nhẹ." }, // index 78
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Trên bàn, ống nghiệm xếp ngay ngắn, vài con mẫu vật ngâm trong lọ thủy tinh." }, // index 79
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Một người đàn ông gầy gò, thấp bé với đôi kính dày che gần nửa khuôn mặt, là Kael, gã đang cắm cúi ghi chép gì đó." }, // index 80
  { bg: "phongsinhhoc.jpg", char: "Mainson.png", text: "Xin lỗi, anh là thầy Kael đúng không?" }, // index 81
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "À vâng. Hai người là?" }, // index 82
  { bg: "phongsinhhoc.jpg", char: "Mainson.png", text: "Cảnh sát điều tra. Đây là thám tử Heirlock, người hỗ trợ vụ án của thầy Ngô Quang." }, // index 83
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Gã ngẩng lên, thoáng giật mình." }, // index 84
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "À vụ đó. Tôi nghe rồi. Thật là khủng khiếp." }, // index 85
  { bg: "phongsinhhoc.jpg", char: "Heirlock.png", text: "Chúng tôi chỉ muốn hỏi vài câu, không làm mất nhiều thời gian của anh đâu." }, // index 86
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Được, mời ngồi. Nhưng tôi nói trước, tôi với tên đó cũng không thân thiết gì mấy." }, // index 87
  { bg: "phongsinhhoc.jpg", char: "Heirlock.png", text: "Tôi đoán vậy. Trong trường, ai cũng nói anh ấy được mọi người quý mến, còn anh thì ít nói, ít giao tiếp." }, // index 88
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Gã nhếch môi cười nhạt, ngả người ra chiếc ghế giáo viên." }, // index 89
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "“Quý mến” à? Cái đó còn tùy cách nhìn." }, // index 90
  { bg: "phongsinhhoc.jpg", char: "Heirlock.png", text: "Ý anh là sao?" }, // index 91
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Người ta chỉ quý kẻ biết làm màu. Tên khốn ấy, miệng lúc nào cũng cười, ai nhờ gì cũng giúp, nhìn thì tưởng tốt đẹp, nhưng giả tạo lắm." }, // index 92
  { bg: "phongsinhhoc.jpg", char: "Heirlock.png", text: "Giả tạo? Anh có thể nói rõ hơn không?" }, // index 93
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Kael im lặng vài giây rồi tiếp lời." }, // index 94
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Thôi, chuyện nội bộ thôi. Nói ra lại bảo tôi nhỏ nhen." }, // index 95
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Heirlock nhìn sang Mainson, hai người ngầm hiểu ý nhau mà gật đầu." }, // index 96
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Hắn biết gặng hỏi thêm giờ chẳng thu được kết quả. Phải khiến gã tự nói ra mới chắc chắn được." }, // index 97
  { bg: "phongsinhhoc.jpg", char: "Heirlock.png", text: "Thầy Axton đã ghi trong sổ 'Trao đổi với Kael'. Anh giải thích sao về chuyện đó?" }, // index 98
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Gã sững lại một chút, ánh mắt có chút lay động." }, // index 99
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Cái gì cơ? Trong sổ có tên tôi?" }, // index 100
  { bg: "phongsinhhoc.jpg", char: "Mainson.png", text: "Đúng. Và hiện trường có hai tách trà, một đã đổ, một còn nguyên. Anh có thể nói tại sao nạn nhân lại hẹn gặp anh không?" }, // index 101
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Tôi… tôi không nhớ. Có thể là trao đổi chuyên môn thôi." }, // index 102
  { bg: "phongsinhhoc.jpg", char: "Heirlock.png", text: "Nhưng anh dạy Sinh, Axton dạy Nhật. Hai người đâu có gì để trao đổi chuyên môn?" }, // index 103
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Mainson bắt lấy thời điểm, giọng nghiêm nghị." }, // index 104
  { bg: "phongsinhhoc.jpg", char: "Mainson.png", text: "Anh Kael, đề nghị anh hợp tác điều tra. Nếu phát hiện lời nói dối, chúng tôi sẽ đưa anh về đồn." }, // index 105
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Lời đe dọa khiến Kael co rúm, sợ hãi hiện rõ." }, // index 106
  { bg: "phongsinhhoc.jpg", char: "Heirlock.png", text: "Hai người có mâu thuẫn, phải chứ?" }, // index 107
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Ừ, có. Một chút." }, // index 108
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Gã thở hắt ra, xoa hai bên thái dương." }, // index 109
  { bg: "phongsinhhoc.jpg", char: "Heirlock.png", text: "Mâu thuẫn gì?" }, // index 110
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Anh ta lúc nào cũng được khen. Học sinh yêu quý, đồng nghiệp nể trọng. Tôi cũng tầm tuổi đó, cũng cố gắng, mà chẳng ai nhớ tới. Anh bảo sao tôi không khó chịu?" }, // index 111
  { bg: "phongsinhhoc.jpg", char: "Heirlock.png", text: "Khó chịu đến mức cãi nhau à?" }, // index 112
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Có một lần. Về… chuyện học sinh." }, // index 113
  { bg: "phongsinhhoc.jpg", char: "Mainson.png", text: "Chính xác là chuyện gì, tôi có thể biết thêm được không?" }, // index 114
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Kael đột nhiên lạnh nhạt hẳn, chẳng còn vẻ sợ hãi như vừa rồi nữa mà trực tiếp đứng dậy đuổi khéo hai người." }, // index 115
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Các anh cảnh sát thông cảm, tôi cần phải chuẩn bị cho buổi dạy học sắp tới, chúng ta có thể nói chuyện vào lần tiếp theo." }, // index 116
  { bg: "phongsinhhoc.jpg", char: "Mainson.png", text: "Nhưng…" }, // index 117
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Heirlock dùng tay ngăn cậu Mainson lại, lắc đầu." }, // index 118
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Hắn biết không thể chỉ hỏi một phía, liền thúc Mainson ra hiệu, cậu nhanh chóng hiểu ý mà tiếp lời." }, // index 119
  { bg: "phongsinhhoc.jpg", char: "Mainson.png", text: "Thám tử Heirlock, bên ngoài cũng gọi chúng ta rồi. Anh Kael, buổi sau nói chuyện rõ hơn nhé, cảm ơn vì đã hợp tác." }, // index 120
  { bg: "santruong.jpg" }, // index 121
  { bg: "santruong.jpg", char: "Narrator", text: "Gió thổi nhẹ qua hành lang, tiếng bước chân vang lên đều đặn." }, // index 122
  { bg: "santruong.jpg", char: "Mainson.png", text: "Kael, anh ta không muốn hợp tác với chúng ta, phải làm sao đây?" }, // index 123
  { bg: "santruong.jpg", char: "Heirlock.png", text: "Chỉ còn cách hỏi thăm những người khác trong trường thôi." }, // index 124
  { bg: "santruong.jpg", char: "Narrator", text: "Cả hai nhìn thấy một người phụ nữ mặc thường phục của giáo viên liền nhanh chóng tiến lại." }, // index 125
  { bg: "santruong.jpg", char: "Mainson.png", text: "Xin chào!" }, // index 126
  { bg: "santruong.jpg", char: "Giáo viên.png", text: "Vâng, hai người là…" }, // index 127
  { bg: "santruong.jpg", char: "Mainson.png", text: "Chúng tôi là cảnh sát điều tra vụ việc cái chết của thầy Axton tại nhà riêng, chúng tôi có thể hỏi cô vài điều về mối quan hệ giữa thầy Axton và thầy Kael được chứ?" }, // index 128
  { bg: "santruong.jpg", char: "Narrator", text: "Người giáo viên chần chừ một hồi rồi cũng miễn cưỡng gật đầu, quay người trở lại trường." }, // index 129
  { bg: "santruong.jpg", char: "Giáo viên.png", text: "Được thôi, vậy chúng ta tới phòng giáo viên của tôi để nói chuyện nhé, đứng ngay sân trường như thế này không tiện cho lắm." }, // index 130
  { bg: "santruong.jpg", char: "Narrator", text: "Heirlock gật đầu, ba người bước tới trước phòng dành cho giáo viên." }, // index 131
  { bg: "phonggiaovien.jpg" }, // index 132
  { bg: "phonggiaovien.jpg", char: "Giáo viên.png", text: "Anh cảnh sát đợi tôi chút nhé, để tôi rót nước mời hai người… ừm?" }, // index 133
  { bg: "phonggiaovien.jpg", char: "Mainson.png", text: "Là Mainson, tôi là cảnh sát thuộc đội điều tra vụ án còn bên cạnh là thám tử tư Heirlock được ủy quyền hỗ trợ cho vụ án lần này." }, // index 134
  { bg: "phonggiaovien.jpg", char: "Giáo viên.png", text: "Được rồi, vậy anh Heirlock và cảnh sát Mainson đây muốn uống trà hay cafe?" }, // index 135
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Cho chúng tôi nước lọc là ổn rồi, dù sao cũng chỉ là một vài câu hỏi ngắn gọn thôi, sẽ không tốn nhiều thời gian của cô đâu." }, // index 136
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Người giáo viên gật đầu rồi ngồi xuống chiếc ghế sofa đối diện với Heirlock." }, // index 137
  { bg: "phonggiaovien.jpg", char: "Giáo viên.png", text: "Tôi là Jessica, cứ gọi vậy là được." }, // index 138
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Được rồi, vậy cho phép chúng tôi hỏi thẳng, mối quan hệ của hai thầy Axton và thầy Kael như thế nào?" }, // index 139
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Jessica có chút ngạc nhiên, như phát hiện được điều gì đó liền nhướng mày nói nhỏ." }, // index 140
  { bg: "phonggiaovien.jpg", char: "Jessica.png", text: "Ý anh thám tử Kael là nghi phạm giết thầy Axton sao?" }, // index 141
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Không không, tôi chỉ điều tra những mối quan hệ xung quanh nạn nhân mà thôi, chưa có bất cứ bằng chứng nào để nghi ngờ hung thủ là bất cứ ai cả, kể cả thầy Kael." }, // index 142
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Jessica âm trầm một lúc như đang suy nghĩ gì đó rồi đáp lời." }, // index 143
  { bg: "phonggiaovien.jpg", char: "Jessica.png", text: "Tôi nghĩ ai cũng thấy rõ, thầy Kael ghét thầy Axton." }, // index 144
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Ghét ở mức độ nào?" }, // index 145
  { bg: "phonggiaovien.jpg", char: "Jessica.png", text: "Kiểu như đố kỵ. Lúc họp hội đồng, thầy Kael hay châm chọc Axton, luôn nói móc rằng thầy Axton mua chuộc ban cán bộ mới lên được chức đó. Axton thì hiền, dạy tốt, hay được học sinh quý." }, // index 146
  { bg: "phonggiaovien.jpg", char: "Jessica.png", text: "Thầy Axton mất đi như vậy thực sự là một nỗi tiếc nuối lớn cho cả trường chúng tôi." }, // index 147
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Hai người đó có bao giờ nói chuyện thân thiết với học sinh nào không?" }, // index 148
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Jessica im lặng." }, // index 149
  { bg: "phonggiaovien.jpg", char: "Mainson.png", text: "Hay kiểu như… tin đồn tình cảm giữa thầy Axton với học sinh nữ nào đó?" }, // index 150
  { bg: "phonggiaovien.jpg", char: "Jessica.png", text: "Là Yanna. Học sinh cưng của thầy Kael, cũng thân với Axton." }, // index 151
  { bg: "phonggiaovien.jpg", char: "Mainson.png", text: "Yanna đó cũng học lớp thầy Hải đúng không?" }, // index 152
  { bg: "phonggiaovien.jpg", char: "Jessica.png", text: "Đúng. Cô bé học giỏi, ngoan, xinh. Ai cũng nói Axton thương như em gái nhưng có vẻ thầy Kael không nghĩ vậy." }, // index 153
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Ý cô là?" }, // index 154
  { bg: "phonggiaovien.jpg", char: "Jessica.png", text: "Là thầy Kael ghen. Có tình cảm với Yanna. Tôi từng thấy thầy ấy dung túng cho cô bé nhiều lần trong tiết học, hay tìm cách được gần gũi với Yanna dù con bé có vẻ không thoải mái lắm." }, // index 155
  { bg: "phonggiaovien.jpg", char: "Jessica.png", text: "Cũng có lần tôi thấy hai thầy cãi nhau to, tôi cũng đoán là về Yanna." }, // index 156
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Heirlock liếc sang Mainson, cả hai cùng hiểu ý." }, // index 157
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Họ quyết định rút lui. Tuy nhiên đêm đó Mainson vẫn để mắt tới hành tung của thầy Kael." }, // index 158
  { bg: "phongsinhhoc.jpg" }, // index 159
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Sáng hôm sau, Kael đang sắp xếp dụng cụ thì thấy hai người bước vào. Gương mặt ông thoáng cứng lại." }, // index 160
  { bg: "phongsinhhoc.jpg", char: "Mainson.png", text: "Chào thầy Kael, có lẽ hôm nay thầy đã rảnh rỗi hơn rồi phải chứ, vậy chúng ta nói chuyện tiếp nhé, đây là một phần cho việc điều tra, tôi mong thầy có thể hợp tác." }, // index 161
  { bg: "phongsinhhoc.jpg", char: "Heirlock.png", text: "Chúng tôi muốn hỏi thêm về việc thầy Axton từng hẹn gặp riêng thầy, tôi có thể hỏi lý do là gì không?" }, // index 162
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Gương mặt gã thoáng khó chịu." }, // index 163
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Tôi đã nói rồi, tôi không biết." }, // index 164
  { bg: "phongsinhhoc.jpg", char: "Heirlock.png", text: "Thầy có từng cãi nhau với Axton, đúng chứ?" }, // index 165
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Ai nói vậy?" }, // index 166
  { bg: "phongsinhhoc.jpg", char: "Mainson.png", text: "Nhiều người trong trường. Họ nói hai người bất hòa từ lâu." }, // index 167
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Nếu hai người tin mấy lời đồn đó thì đi mà hỏi họ." }, // index 168
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Gã tỏ rõ sự bực dọc nhưng lại che giấu, tiếp tục với ống nghiệm." }, // index 169
  { bg: "phongsinhhoc.jpg", char: "Heirlock.png", text: "Thầy có vẻ rất ghét thầy Axton." }, // index 170
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Kael nhíu mày, ống nghiệm trên tay gã hơi rung nhẹ làm thứ chất lỏng đặc quánh trong đó khẽ sóng sánh." }, // index 171
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Còn không phải vì hắn ta là kẻ đáng ghét sao." }, // index 172
  { bg: "phongsinhhoc.jpg", char: "Heirlock.png", text: "Thầy nghĩ Axton giả tạo?" }, // index 173
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Không giả tạo. Nhưng không thật lòng như mọi người tưởng. Hắn ta thân thiết với học sinh nữ quá mức." }, // index 174
  { bg: "phongsinhhoc.jpg", char: "Mainson.png", text: "Ý anh là Yanna đúng chứ?" }, // index 175
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Kael mở to mắt đầy kinh ngạc." }, // index 176
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Sao anh biết về cái tên này?" }, // index 177
  { bg: "phongsinhhoc.jpg", char: "Heirlock.png", text: "Tôi chỉ hỏi một vài người trong trường mà thôi, mối quan hệ của anh và thầy Axton có vẻ căng thẳng hơn là một cuộc xích mích thông thường nhỉ?" }, // index 178
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Gã thoáng ngạc nhiên nhưng rồi cười nhẹ." }, // index 179
  { bg: "phongsinhhoc.jpg", char: "Heirlock.png", text: "Có chuyện gì sao?" }, // index 180
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Tôi chỉ không muốn cô bé bị kéo vào mấy mối quan hệ mập mờ. Anh ta mời con bé đi ăn, đưa đón hàng ngày. Như thế có hợp lý đối với một giáo viên bình thường không?" }, // index 181
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Mainson nhíu mày, nghe cách nói chuyện của Kael, cậu có thể đoán được đây là một mối tình tay ba phức tạp." }, // index 182
  { bg: "phongsinhhoc.jpg", char: "Mainson.png", text: "Thầy có bằng chứng không?" }, // index 183
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Cô bé từng kể với tôi. Nói là thầy Axton hay giúp đỡ, mua sách, dạy thêm không công. Ai mà không hiểu ý đồ thật của tên đó chứ." }, // index 184
  { bg: "phongsinhhoc.jpg", char: "Heirlock.png", text: "Hay là thầy quan tâm Yanna quá mức nên mới để ý từng chuyện như vậy?" }, // index 185
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Gã siết chặt tay, ánh mắt giận dữ." }, // index 186
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Tôi chỉ muốn cô ấy yên ổn học hành. Nếu hắn ta không xen vào, mọi chuyện đã khác!" }, // index 187
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Heirlock im lặng nhìn đối phương, ánh mắt không rời khuôn mặt run run vì tức." }, // index 188
  { bg: "phongsinhhoc.jpg", char: "Mainson.png", text: "Thầy Kael, hôm Axton chết, thầy có ở nhà suốt chứ?" }, // index 189
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Tôi có việc ra ngoài. Nhưng không liên quan gì tới cái chết đó." }, // index 190
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Không khí chùng xuống. Tiếng kim đồng hồ kêu đều. Heirlock gật đầu với Mainson, ánh mắt đăm chiêu." }, // index 191
  { bg: "phongsinhhoc.jpg", char: "Mainson.png", text: "Có ai làm chứng cho việc thầy không có mặt tại hiện trường không? Và 'chút việc' đó là gì, chúng tôi có thể biết được chứ?" }, // index 192
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Kael im lặng một lúc, ánh mắt thoáng lo lắng." }, // index 193
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Tôi ra ngoài, chỉ đi dạo một chút sau giờ học, không liên quan gì tới vụ việc." }, // index 194
  { bg: "phongsinhhoc.jpg", char: "Heirlock.png", text: "Đi dạo sao, vào khoảng thời gian nào?" }, // index 195
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Từ chiều sau khi tan lớp tới tối. Làm sao tôi đoán trước được Axton sẽ chết để mà tìm nhân chứng trong lúc đi dạo chứ?" }, // index 196
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Heirlock gật đầu lắng nghe trong khi bên cạnh Mainson đang chăm chú ghi chép lời khai của nhân chứng vào sổ tay." }, // index 197
  { bg: "phongsinhhoc.jpg", char: "Mainson.png", text: "Vậy không có ai làm chứng cho anh, được rồi. Chúng tôi sẽ xác minh, cảm ơn thầy Kael đã hợp tác." }, // index 198
  { bg: "santruong.jpg" }, // index 199
  { bg: "santruong.jpg", char: "Narrator", text: "Hai người bước ra khỏi lớp học, Mainson lên tiếng." }, // index 200
  { bg: "santruong.jpg", char: "Mainson.png", text: "Không lấy được thêm thông tin gì ở Kael rồi, có lẽ chúng ta phải hỏi tới cô bé Yanna trong câu chuyện này thôi." }, // index 201
  { bg: "santruong.jpg", char: "Narrator", text: "Heirlock gật đầu, hai người bước tới lớp học của Yanna." }, // index 202
  { bg: "lophochochoc.jpg" }, // index 203
  { bg: "lophochochoc.jpg", char: "Narrator", text: "Phòng học lớp 12 yên ắng, chỉ còn vài học sinh chuẩn bị đồ. Yanna ngồi ngay ngắn, tập trung vào sách vở khi Heirlock và Mainson bước vào." }, // index 204
  { bg: "lophochochoc.jpg", char: "Heirlock.png", text: "Chào Yanna. Chúng tôi muốn hỏi một số chuyện liên quan tới thầy Kael và thầy Axton." }, // index 205
  { bg: "lophochochoc.jpg", char: "Narrator", text: "Yanna ngẩng đầu, ánh mắt ngoan ngoãn cùng giọng nhỏ nhẹ, cất tiếng đáp lời." }, // index 206
  { bg: "lophochochoc.jpg", char: "Yanna.png", text: "Vâng, em có thể trả lời được. Nhưng anh cảnh sát có thể đợi thêm chút nữa được chứ, em không muốn bị bạn bè hiểu nhầm." }, // index 207
  { bg: "phonggiaovien.jpg" }, // index 208
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Mainson và Heirlock tới phòng giáo viên trước, cậu lên tiếng trước." }, // index 209
  { bg: "phonggiaovien.jpg", char: "Mainson.png", text: "Heirlock, anh có thấy con bé đó, tên gì nhỉ?" }, // index 210
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Yanna." }, // index 211
  { bg: "phonggiaovien.jpg", char: "Mainson.png", text: "Phải rồi, là Yanna, con bé này ngoan thật, một câu vâng hai câu dạ, lúc nào cũng tươi cười với mọi người xung quanh. Nếu tôi là thầy Axton hay Kael có lẽ cũng sẽ vô thức mà thiên vị con bé hơn một chút thôi." }, // index 212
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Mainson nói không ngừng nghỉ khiến Heirlock mệt mỏi bóp lấy thái dương của mình, tặc lưỡi đầy lười biếng." }, // index 213
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Cậu im lặng giúp tôi chút đi." }, // index 214
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Hơn nữa, cậu thực sự nghĩ con bé đó đơn giản à?" }, // index 215
  { bg: "phonggiaovien.jpg", char: "Mainson.png", text: "Anh không thấy vậy sao, Yanna nó như một mặt trời nhỏ vậy, người đơn thuần như thế sao có thể có vấn đề gì được chứ." }, // index 216
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Mainson, nghe này." }, // index 217
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Heirlock đặt một tay lên vai cậu khiến Mainson im lặng, khó hiểu." }, // index 218
  { bg: "phonggiaovien.jpg", char: "Mainson.png", text: "Vâng?" }, // index 219
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Cậu không xứng làm một cảnh sát, anh chàng tin người của tôi à." }, // index 220
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Trong lúc Mainson còn đang không hiểu chuyện gì thì đã vang lên tiếng gõ cửa." }, // index 221
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Vào đi!" }, // index 222
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Yanna bước vào, mái tóc ngắn khẽ lung lay dưới làn gió mát khiến Mainson không thể rời mắt." }, // index 223
  { bg: "phonggiaovien.jpg", char: "Yanna.png", text: "Em tới rồi ạ." }, // index 224
  { bg: "phonggiaovien.jpg", char: "Mainson.png", text: "Ừm, em ngồi đi, để anh lấy nước cho em nhé." }, // index 225
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Mainson nhanh nhảu muốn đứng dậy nhưng đã bị Heirlock ngăn lại." }, // index 226
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Mainson, đây không phải sở cảnh sát của cậu đâu." }, // index 227
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Cậu không ngu ngốc tới mức chẳng nhận ra đây là một lời nhắc nhở rằng bản thân đã làm những thứ vượt quá sự cho phép ở nơi này liền ngoan ngoãn ngồi về chỗ cũ, bên cạnh vị thám tử tư." }, // index 228
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Em có thường gặp thầy Kael sau giờ học không?" }, // index 229
  { bg: "phonggiaovien.jpg", char: "Yanna.png", text: "Dạ, thầy ấy nhiều lần nhờ em làm việc riêng, cũng hay gọi ra ngoài để nói chuyện. Em cũng không thích nhưng không biết từ chối thế nào." }, // index 230
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Em cảm thấy phiền chứ?" }, // index 231
  { bg: "phonggiaovien.jpg", char: "Yanna.png", text: "Dạ có. Nhưng em sợ nếu từ chối, thầy sẽ khó chịu, nên em chỉ cố làm cho xong." }, // index 232
  { bg: "phonggiaovien.jpg", char: "Mainson.png", text: "Còn thầy Axton thì sao?" }, // index 233
  { bg: "phonggiaovien.jpg", char: "Yanna.png", text: "Thầy Axton chỉ giải đáp bài vở trong lớp thôi. Chúng em ít khi gặp riêng ngoài giờ học, có một lần em lỡ chuyến xe bus về nhà, thầy có nói vì thầy tiện đường nên ngỏ ý chở em về, đó là lần duy nhất. Em tôn trọng thầy lắm, nhưng không quá thân thiết." }, // index 234
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Có bạn nào khác biết thầy Kael làm phiền em không?" }, // index 235
  { bg: "phonggiaovien.jpg", char: "Yanna.png", text: "Dạ, một vài bạn có biết nhưng em không muốn mọi người can thiệp, em không muốn dính vào rắc rối. Dù sao thấy Kael dù làm phiền nhưng cũng chưa làm ra hành động gì quá đáng. Em chỉ muốn tập trung học." }, // index 236
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Yanna kể chuyện một cách ngoan ngoãn, ánh mắt sáng lên khi nhắc về Axton và khẽ run khi nói tới Kael." }, // index 237
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Được rồi, tôi có thể hỏi một điều cuối không?" }, // index 238
  { bg: "phonggiaovien.jpg", char: "Yanna.png", text: "Vâng, anh thám tử cứ hỏi ạ, em sẽ trả lời trong khả năng cho phép." }, // index 239
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Heirlock lật cuốn sổ tay của Mainson trên bàn, tới trang lời khai của Kael thì ngưng lại." }, // index 240
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Vào thời gian sau khi tan học ngày Axton xảy ra biến cố, em đang ở đâu?" }, // index 241
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Yanna bất ngờ, em run lên khi nhận ra lí do của câu hỏi này nhưng vẫn cố gắng giữ sự bình tĩnh." }, // index 242
  { bg: "phonggiaovien.jpg", char: "Yanna.png", text: "Hôm đó thầy Kael đã nằng nặc đòi đưa em về nhà, em và thầy có nói qua lại một lúc lâu ở khu đợi bus, vào lúc đấy em đang ở cùng thầy Kael." }, // index 243
  { bg: "phonggiaovien.jpg", char: "Mainson.png", text: "Cái tên Kael này, hắn làm phiền cả học sinh của chính mình nữa." }, // index 244
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Mainson, để ý ngôn từ." }, // index 245
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Heirlock nói rồi nhìn vào cuốn sổ tay trên bàn mà gật gù, vậy là thời điểm Axton chết, Kael nói mình có việc đi dạo nhưng thực chất là tìm cách dây dưa với học sinh, còn Yanna chỉ đơn giản là từ chối." }, // index 246
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Muốn xác nhận lại điều này không quá khó, chỉ cần hỏi mấy người ở gần trạm xe bus là rõ, dù sao Yanna cũng thường xuyên về bằng chuyến này mỗi ngày, những người đi làm, đi học tại chuyến bus đó có lẽ cũng nghe được phần nào câu chuyện." }, // index 247
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Được rồi, cuộc nói chuyện tới đây thôi, cảm ơn em đã hợp tác." }, // index 248
  { bg: "phonggiaovien.jpg", char: "Yanna.png", text: "Vâng, vậy em xin phép về trước." }, // index 249
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Sau khi trò chuyện xong, Yanna cúi đầu chào, ngoan ngoãn rời khỏi phòng giáo viên. Heirlock và Mainson cũng theo đó mà ra ngoài, cậu nhanh chóng kéo lấy Heirlock." }, // index 250
  { bg: "santruong.jpg" }, // index 251
  { bg: "santruong.jpg", char: "Mainson.png", text: "Thám tử, tên Kael này đúng là một kẻ khốn nạn." }, // index 252
  { bg: "santruong.jpg", char: "Heirlock.png", text: "Được rồi, nếu cậu muốn lấy lại công bằng cho Yanna thế thì đi tới trạm bus hỏi mọi người về việc có thấy cuộc cãi vã nào giữa con bé và Kael chiều ngày hôm đó không đi." }, // index 253
  { bg: "santruong.jpg", char: "Mainson.png", text: "Ơ, không phải chúng ta hoạt động cùng nhau sao?" }, // index 254
  { bg: "santruong.jpg", char: "Narrator", text: "Heirlock liếc mắt, lười biếng phẩy tay." }, // index 255
  { bg: "santruong.jpg", char: "Heirlock.png", text: "Đem theo cậu suốt như vậy sợ rằng cậu sẽ nói hết tiến trình vụ án ra mất." }, // index 256
  { bg: "santruong.jpg", char: "Narrator", text: "Mainson xụ mặt nhưng vẫn phải làm theo lời hắn, chậm rãi lết thân mình đi về phía bến xe bus duy nhất ở gần trường trong khi Heirlock trở về cục cảnh sát. Hắn cần phải nghe kết quả khám nghiệm chi tiết." }, // index 257
  { bg: "cuccanhsat.jpg" }, // index 258
  { bg: "cuccanhsat.jpg", char: "Narrator", text: "Ngay khi vừa trở về cục cảnh sát, một tiếng động ồn ào quen thuộc từ phía bên kia hành lang đã vang lên khiến Heirlock ngay lập tức nhận ra âm thanh từ phòng pháp y." }, // index 259
  { bg: "cuccanhsat.jpg", char: "Narrator", text: "Cửa phòng pháp y nằm cuối hành lang, ánh đèn trắng mờ hắt ra. Mùi thuốc sát trùng nồng nặc. Heirlock đẩy cửa, tiếng bản lề kẽo kẹt vang lên." }, // index 260
  { bg: "phongphapy.jpg" }, // index 261
  { bg: "phongphapy.jpg", char: "Narrator", text: "Pháp y ngẩng lên, tháo găng tay, khẽ gật đầu chào." }, // index 262
  { bg: "phongphapy.jpg", char: "Kam.png", text: "À, thám tử Heirlock, anh đến đúng lúc đấy. Kết quả vừa có xong." }, // index 263
  { bg: "phongphapy.jpg", char: "Heirlock.png", text: "Kam à, trông cậu như đã thức trắng mấy đêm rồi vậy." }, // index 264
  { bg: "phongphapy.jpg", char: "Kam.png", text: "Thám tử của tôi đoán hay lắm, chính xác, tôi đã thức hơn 48 tiếng rồi đây, và giờ thì mau lại đây, nghe kĩ từng thứ và viết toàn bộ chúng vào cái cuốn sổ tay của anh đi, đừng bắt tôi phải nói thêm bất cứ lần nào." }, // index 265
  { bg: "phongphapy.jpg", char: "Narrator", text: "Anh chàng pháp y trẻ tuổi với đôi mắt thâm đen tựa gấu trúc sau một thời gian dài bận rộn mệt mỏi ngồi phịch xuống chiếc ghế gỗ trước mặt, cảm tưởng như chỉ cần thêm một giây im lặng nữa thôi anh ta có thể ngủ gật ngay tại đây, trước cái xác đã khô." }, // index 266
  { bg: "phongphapy.jpg", char: "Heirlock.png", text: "Tôi muốn nghe toàn bộ chi tiết, từng phần một." }, // index 267
  { bg: "phongphapy.jpg", char: "Narrator", text: "Kam chỉ vào tấm khăn trắng phủ thi thể, kéo ra một góc. Vết siết tím bầm lộ rõ dưới ánh đèn lạnh." }, // index 268
  { bg: "phongphapy.jpg", char: "Kam.png", text: "Nguyên nhân tử vong là do siết cổ. Hướng lực lệch phải, hung thủ thuận tay phải." }, // index 269
  { bg: "phongphapy.jpg", char: "Heirlock.png", text: "Có dấu hiệu vật lộn không?" }, // index 270
  { bg: "phongphapy.jpg", char: "Kam.png", text: "Không. Tay, móng, da đều sạch. Có vẻ nạn nhân không kịp phản ứng." }, // index 271
  { bg: "phongphapy.jpg", char: "Heirlock.png", text: "Còn điều gì bất thường?" }, // index 272
  { bg: "phongphapy.jpg", char: "Kam.png", text: "Có, là vết thương ở vùng kín." }, // index 273
  { bg: "phongphapy.jpg", char: "Kam.png", text: "Nạn nhân bị chém nhiều nhát vào bộ phận sinh dục. Vết cắt rất đều tay, độ sâu gần như y hệt nhau, dương vật hoàn toàn rời ra khỏi cơ thể." }, // index 274
  { bg: "phongphapy.jpg", char: "Kam.png", text: "Bộ phận sinh dục bị tổn thương nặng, một số vết hằn sâu nhưng rất chuẩn xác. Có thể hung thủ có chuyên môn nên vết cắt mới ngọt được như vậy." }, // index 275
  { bg: "phongphapy.jpg", char: "Narrator", text: "Heirlock gật đầu, nhanh chóng ghi vào sổ tay những điều quan trọng." }, // index 276
  { bg: "phongphapy.jpg", char: "Heirlock.png", text: "Vậy còn vết siết cổ?" }, // index 277
  { bg: "phongphapy.jpg", char: "Kam.png", text: "Vết siết cổ hằn sâu trên da, có nhiều vết chồng lên nhau." }, // index 278
  { bg: "phongphapy.jpg", char: "Kam.png", text: "Hướng lực lệch sang bên phải, chứng tỏ hung thủ thuận tay phải nhưng không có tính toán từ trước." }, // index 279
  { bg: "phongphapy.jpg", char: "Heirlock.png", text: "Một hung thủ không có kinh nghiệm, giết người vì thù oán cá nhân à." }, // index 280
  { bg: "phongphapy.jpg", char: "Kam.png", text: "Nạn nhân có thể có vóc dáng nhỏ con nên vết siết hằn sâu hơn mức bình thường và chồng lên nhau do nạn nhân chống cự." }, // index 281
  { bg: "phongphapy.jpg", char: "Kam.png", text: "Trong phổi vẫn còn khí, chứng tỏ bị siết khi còn sống, không phải sau khi ngạt, tức là nguyên nhân cái chết không phải là do mất máu, dù mất nhiều máu nhưng nạn nhân vẫn còn sống, thời điểm chính thức rời đi là khi bị siết cổ." }, // index 282
  { bg: "phongphapy.jpg", char: "Narrator", text: "Nói rồi Kam cũng nhìn về phía cuốn sổ tay của người trước mặt, tiếp lời." }, // index 283
  { bg: "phongphapy.jpg", char: "Kam.png", text: "Thời gian tử vong ước tính khoảng 20h15 tới 20h30 ngày 4/8/2025." }, // index 284
  { bg: "phongphapy.jpg", char: "Narrator", text: "Heirlock cau mày, khẽ chạm tay lên mép bàn inox, trầm ngâm vài giây." }, // index 285
  { bg: "phongphapy.jpg", char: "Heirlock.png", text: "Vậy tại sao cửa lại khóa từ trong?" }, // index 286
  { bg: "phongphapy.jpg", char: "Kam.png", text: "Đó mới là điểm lạ. Mọi người đã xem qua ổ khóa, không có dấu cạy, không có vết va chạm. Có thể ai đó đã dùng chìa dự phòng." }, // index 287
  { bg: "phongphapy.jpg", char: "Narrator", text: "Căn phòng lại chìm vào im lặng, chỉ còn tiếng kim loại chạm nhẹ vào khay đựng dụng cụ. Heirlock khép sổ, ánh mắt nặng trĩu suy tính." }, // index 288
  { bg: "phongphapy.jpg", char: "Heirlock.png", text: "Cảm ơn, tôi sẽ quay lại khi có thêm dữ liệu." }, // index 289
  { bg: "phongphapy.jpg", char: "Kam.png", text: "Ừ, nhớ đem cà phê lần sau nhé, Heirlock. Tôi thức với anh cả đêm rồi đấy." }, // index 290
  { bg: "phongphapy.jpg", char: "Narrator", text: "Heirlock khẽ nhếch môi, chẳng đáp mà chỉ xoay người rời khỏi phòng, bóng hắn dần khuất sau cánh cửa, chỉ còn lại tay pháp y khẽ mỉm cười." }, // index 291
  { bg: "vanphong.jpg" }, // index 292
  { bg: "vanphong.jpg", char: "Narrator", text: "Heirlock trở lại văn phòng, đẩy cửa gỗ nặng nề, tiếng bản lề khẽ kẽo kẹt vang lên." }, // index 293
  { bg: "vanphong.jpg", char: "Narrator", text: "Không gian yên tĩnh, ánh sáng đèn bàn vàng nhạt rọi lên sổ tay, giấy tờ và vài bản đồ treo trên tường." }, // index 294
  { bg: "vanphong.jpg", char: "Narrator", text: "Hắn ngồi xuống ghế da, đặt cuốn sổ tay lên bàn, nhìn chăm chú vào các ghi chú vừa có được sau khi nói chuyện với bên pháp y." }, // index 295
  { bg: "vanphong.jpg", char: "Narrator", text: "Heirlock thở dài, ngón tay gõ nhẹ lên bàn, suy nghĩ về những mảnh thông tin vừa thu thập được." }, // index 296
  { bg: "vanphong.jpg", char: "Narrator", text: "Một lúc sau, tiếng cửa mở khẽ vang lên, Mainson bước vào, vẻ mặt đã thấm chút mệt mỏi." }, // index 297
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Thám tử, tôi vừa điều tra xong về việc của Yanna và Kael từ bến xe bus. Ở đó, đúng là có thấy Kael và Yanna cãi nhau nhưng chỉ khoảng 15 phút thôi, không lâu lắm." }, // index 298
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Xung quanh mọi người cũng có chứng kiến vài câu qua lại, nhưng không có gì căng thẳng quá, Kael cố gắng muốn con bé lên xe mình nhưng Yanna từ chối thẳng thừng và tự lên xe bus còn Kael thì bỏ về." }, // index 299
  { bg: "vanphong.jpg", char: "Narrator", text: "Heirlock nhướng mày, đặt tay lên cuốn sổ, ánh mắt tập trung vào những dòng chữ viết trên đó." }, // index 300
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Vậy à, còn tôi thì vừa từ phòng pháp y về, thời gian tử vong khoảng 8hqt tới 8h30 tối." }, // index 301
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Cậu nói cãi nhau ở bến bus vào khoảng 6h hơn, đúng không?" }, // index 302
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Đúng, khoảng 18h10 tới 18h25 là thời điểm cãi nhau." }, // index 303
  { bg: "vanphong.jpg", char: "Narrator", text: "Heirlock gật đầu, ánh mắt đăm chiêu." }, // index 304
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Như vậy Kael vẫn còn đủ thời gian để rời khỏi bến, di chuyển và sát hại nạn nhân trước 20h15." }, // index 305
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Thời gian giữa hai sự kiện kéo dài hơn một tiếng rưỡi, Kael hoàn toàn có khả năng thực hiện hành động đó mà không ai nhìn thấy." }, // index 306
  { bg: "vanphong.jpg", char: "Narrator", text: "Mainson đứng im, nhìn Heirlock ghi chú trong sổ tay. Hắn cẩn thận đối chiếu thời gian, ánh sáng từ đèn bàn hắt lên nét mặt tập trung." }, // index 307
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Điều này trùng khớp với phân tích pháp y, nạn nhân chết khoảng 20h15 tới 20h30, vết siết cổ còn mới, khí vẫn trong phổi, mất máu nhiều nhưng không phải nguyên nhân chính." }, // index 308
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Vậy Kael thực sự có cơ hội để làm chuyện đó sau khi rời khỏi bến xe bus?" }, // index 309
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Đúng. Mọi thứ đều phù hợp với khả năng rằng Kael là hung thủ." }, // index 310
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Thời gian giữa hai sự kiện đủ dài, Yanna chỉ là nhân chứng gián tiếp, không thể xác nhận trực tiếp hành vi sát hại vậy nên chúng ta vẫn chưa đủ bằng chứng." }, // index 311
  { bg: "vanphong.jpg", char: "Narrator", text: "Mainson khẽ thở dài, cảm giác nặng nề lan ra khắp phòng. Cậu ngồi xuống ghế, nhìn Heirlock với ánh mắt như chờ đợi câu trả lời." }, // index 312
  { bg: "vanphong.jpg", char: "Narrator", text: "Heirlock ngồi im một lúc, nhìn ra cửa sổ văn phòng, ánh đèn đường bên ngoài hắt vào, tạo những dải sáng mờ trên sàn." }, // index 313
  { bg: "vanphong.jpg", char: "Narrator", text: "Mọi mảnh thông tin đang xếp chồng lên nhau, thời gian, hành vi, nhân chứng và chứng cứ pháp y, tất cả đều tạo nên bức tranh khả nghi, mà trung tâm vẫn là Kael." }, // index 314
  { bg: "vanphong.jpg" }, // index 315
  { bg: "vanphong.jpg", char: "Narrator", text: "Tiếng đồng hồ trên tường tích tắc đều đều, mưa lất phất rơi ngoài cửa sổ." }, // index 316
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Heirlock ngồi vắt chân lên bàn, nhấm nháp tách cà phê còn nóng, ánh mắt lướt qua quyển sổ tay ghi chú vụ án. Hắn bấm một dãy số trên điện thoại rồi đưa lên." }, // index 317
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Mainson, dậy đi. Chuẩn bị lên trường ngay. Chúng ta cần nói chuyện với Kael." }, // index 318
  { bg: "vanphong.jpg", char: "Narrator", text: "Tiếng điện thoại vang lên, Mainson cầm máy, giọng còn ngái ngủ." }, // index 319
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Sớm vậy sao, mới có 5h mà. Thôi được rồi, tôi sẽ tới ngay." }, // index 320
  { bg: "vanphong.jpg", char: "Narrator", text: "Heirlock mặc áo mưa, kéo dây kéo kín cổ, bước ra khỏi văn phòng, đôi giày bốt đen cắm vào vũng nước nhỏ, bùn văng tung tóe." }, // index 321
  { bg: "santruong.jpg" }, // index 322
  { bg: "santruong.jpg", char: "Narrator", text: "Gió lạnh lướt qua mặt cùng làn mưa rơi lất phất, những hạt mưa nhỏ đọng trên mũ làm tóc hắn ướt, nặng trĩu." }, // index 323
  { bg: "santruong.jpg", char: "Narrator", text: "Heirlock đi trước, tay đút túi, ánh mắt nhìn đường, quan sát những vết bùn loang trên vỉa hè trong khi Mainson nhanh chóng chạy theo phía sau với chiếc ô trên tay, cố gắng che cho cả hai người." }, // index 324
  { bg: "santruong.jpg", char: "Narrator", text: "Bỗng nhiên một vết chân dính bùn in trên sàn gạch men thu hút sự chú ý của hắn." }, // index 325
  { bg: "santruong.jpg", char: "Heirlock.png", text: "Dấu giày này, hình như hơi quen quen…" }, // index 326
  { bg: "santruong.jpg", char: "Mainson.png", text: "Thám tử?" }, // index 327
  { bg: "santruong.jpg", char: "Narrator", text: "Heirlock chỉ vào dấu giày dính bùn đang in trên nền trắng kia mà lẩm bẩm." }, // index 328
  { bg: "santruong.jpg", char: "Heirlock.png", text: "Cậu có thấy nó giống với…" }, // index 329
  { bg: "santruong.jpg", char: "Mainson.png", text: "Là dấu giày ở hiện trường." }, // index 330
  { bg: "santruong.jpg", char: "Narrator", text: "Mainson reo lên, tuy nhiên đây là dấu giày của một hãng giày da khá phổ biến, và cỡ 41 cũng là cỡ chân của nhiều nam giới nữa. Chỉ điều này vẫn chẳng nói lên thứ gì cả." }, // index 331
  { bg: "santruong.jpg", char: "Heirlock.png", text: "Giày của Kael…" }, // index 332
  { bg: "santruong.jpg", char: "Narrator", text: "Hắn suy nghĩ một lúc rồi nhìn về phía cộng sự của mình." }, // index 333
  { bg: "santruong.jpg", char: "Heirlock.png", text: "Mainson, chút nữa để ý giúp tôi chi tiết này khi gặp Kael nhé." }, // index 334
  { bg: "santruong.jpg", char: "Mainson.png", text: "Được thôi, thưa ngài thám tử." }, // index 335
  { bg: "phongsinhhoc.jpg" }, // index 336
  { bg: "phongsinhhoc.jpg", char: "Mainson.png", text: "Xin chào thầy Kael, lại là chúng tôi đây." }, // index 337
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Lần này Kael không bực bội nữa mà chỉ lười biếng ngồi lên ghế, thong thả tiếp tục công việc lắc cái ống nghiệm nhỏ trên tay mình, hoàn toàn chẳng thèm để tâm tới hai người vừa bước vào." }, // index 338
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Vâng thưa ngài thám tử và anh cảnh sát, hôm nay hai người lại muốn nói chuyện gì nữa đây. Xin hãy kết thúc việc tra hỏi này sớm, tôi cần trở lại nhịp sống thường ngày để đạt hiệu quả tốt nhất trong các bài dạy của mình." }, // index 339
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Không để Kael phải chờ đợi lâu, Mainson trực tiếp lôi ra cuốn sổ tay, chất vấn." }, // index 340
  { bg: "phongsinhhoc.jpg", char: "Mainson.png", text: "Thưa thầy Kael, tôi đã hỏi mấy người ở bến bus hôm qua, họ nói thầy và học trò Yanna có gặp nhau vào khoảng 17h30 tới 18h tối, đây là cuộc đi dạo mà thầy đã nói hôm trước sao?" }, // index 341
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Kael tỏ rõ vẻ ấp úng nhưng rồi nhanh chóng bật lại, thể hiện sự bực bội rõ rệt." }, // index 342
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Thì đúng là tôi có nói chuyện với Yanna, nhưng việc tôi nói chuyện cùng học sinh nữ thuộc lớp mình sau giờ học ở bến xe bus thì cũng đâu có vấn đề gì." }, // index 343
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Hơn nữa, việc tôi làm gì từ bao giờ lại bắt buộc phải nói ra cho mấy người vậy." }, // index 344
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Heirlock không bực bội, hắn đã quá quen với những nghi phạm luôn trở nên cáu gắt mỗi khi bị hỏi chuyện rồi." }, // index 345
  { bg: "phongsinhhoc.jpg", char: "Heirlock.png", text: "Được rồi, thầy Kael, chúng tôi mới chỉ đang hỏi chuyện thôi, còn chưa có gì mà, thầy đừng căng thẳng như thế, trừ khi…" }, // index 346
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Nói tới đây hắn ngưng lại một chút khiến cho Kael tò mò." }, // index 347
  { bg: "phongsinhhoc.jpg", char: "Heirlock.png", text: "Trừ khi hung thủ chính là thầy, thầy Kael." }, // index 348
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Mấy người bị điên sao, chỉ vì mỗi việc tôi nói dối rằng đã đi dạo thay vì nói chuyện với cô học trò của mình mà mấy người cũng suy diễn được tới thế." }, // index 349
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Kael gằn giọng bực tức, mắt gã long lên sòng sọc tựa như có thể nắm cổ hai người họ và ném ra khỏi phòng bất cứ lúc nào vậy." }, // index 350
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Mẹ kiếp, đúng là cái thứ ăn trên đầu trên cổ dân rồi chỉ biết kết tội cho nhanh, cần gì đúng sai." }, // index 351
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Nghe tới đây khiến Mainson bực bội, cậu vừa định đứng lên đối chất thì đã bị Heirlock cản lại, lắc đầu ra hiệu." }, // index 352
  { bg: "phongsinhhoc.jpg", char: "Heirlock.png", text: "Đủ rồi thầy Kael, vậy là thầy đã nói chuyện to tiếng với học sinh Yanna tại bến xe bus lúc 17h30 tới tầm khoảng 18h tối, phải chứ?" }, // index 353
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Khi này Kael mới dịu đi phần nào, gã vắt chéo chân ngồi trên chiếc ghế sofa giữa phòng sinh học." }, // index 354
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Phải, nhưng thế thì sao?" }, // index 355
  { bg: "phongsinhhoc.jpg", char: "Heirlock.png", text: "Vậy từ 18h tới 20h thầy đã đi đâu?" }, // index 356
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Tôi đi dạo, để khuây khoả sau khi bị Yanna từ chối, mấy cái này cũng phải hỏi kĩ đến thế à?" }, // index 357
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Heirlock gật đầu, tay hắn cầm cuốn sổ, ánh mắt lạnh lùng." }, // index 358
  { bg: "phongsinhhoc.jpg", char: "Heirlock.png", text: "Phải rồi thầy Kael, không biết thầy có thể đứng lên và bước lên trước vài bước không?" }, // index 359
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Kael nhăn mặt tỏ vẻ không hiểu chuyện gì, gã đứng lên rồi tiến lên, ngay lập tức cả Mainson và Heirlock đều nhận ra dấu giày quen thuộc." }, // index 360
  { bg: "phongsinhhoc.jpg", char: "Mainson.png", text: "Xin phép thầy Kael chúng tôi sẽ nói thẳng, từ dấu giày, động cơ ghen ghét với Axton, vì không có được Yanna, cuộc cãi nhau trước bến xe bus và thời gian thầy không ở nhà khi Axton chết… tất cả đều hướng về duy nhất một điều." }, // index 361
  { bg: "phongsinhhoc.jpg", char: "Mainson.png", text: "Thầy Kael, thầy là hung thủ đã giết hại Axton." }, // index 362
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Kael gằn giọng, gã đứng bật dậy khỏi ghế, hằm hằm lao tới định túm lấy cổ áo cậu nhưng Mainson đã nhanh chóng lùi lại vài bước." }, // index 363
  { bg: "phongsinhhoc.jpg", char: "Mainson.png", text: "Đề nghị thầy không manh động, những vết cắt trên thi thể nạn nhân quá chuyên nghiệp để có thể là kẻ nghiệp dư, và thầy biết chứ? Một giáo viên sinh học là người dễ dàng làm ra điều đó nhất." }, // index 364
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Mainson tiến thêm vài bước." }, // index 365
  { bg: "phongsinhhoc.jpg", char: "Mainson.png", text: "Hơn nữa, vết siết cổ trên thi thể lặp đi lặp lại nhiều lần, chứng tỏ nạn nhân đã giãy giụa rất kịch liệt khi bị siết, điều đó lại càng phù hợp với thầy, một người có vóc dáng nhỏ con hơn hẳn nạn nhân." }, // index 366
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Heirlock muốn ngăn lại bởi vì vẫn còn vấn đề căn phòng khóa nữa nhưng rồi hắn lại quyết định ngồi yên. Kiểu người như Mainson rất bốc đồng, và lí do duy nhất hắn dẫn theo cậu đi trong mọi vụ án chính là để sự bốc đồng này khiến hung thủ không thể kiềm chế cơn tức giận và lộ diện." }, // index 367
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Bây giờ chính là lúc đó, khi mà Kael bực mình, giọng gã cao dần, mặt đỏ lên." }, // index 368
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Chỉ có vậy thì không thể kết tội tôi được. Tôi không làm gì cả." }, // index 369
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Hắn đứng lên, tay vung mạnh, định đuổi hai người ra khỏi phòng." }, // index 370
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Trong lúc vung tay, một chiếc chìa khoá rơi xuống sàn, ánh kim loại lóe lên dưới ánh đèn phòng." }, // index 371
  { bg: "phongsinhhoc.jpg", char: "Mainson.png", text: "Khoan đã!" }, // index 372
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Kael đột nhiên trở lên hốt hoảng, vội vàng muốn cúi xuống nhặt nó lên nhưng đã bị Heirlock cản lại nhanh chóng." }, // index 373
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Hắn giữ chặt tay người thầy giáo sinh học này, vóc dáng nhỏ nhắn của Kael không thể đọ được với sức lực to lớn của Heirlock, chỉ có thể bất lực nhìn Mainson hành động." }, // index 374
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Mainson cúi xuống, đeo găng tay, nhặt chìa khoá." }, // index 375
  { bg: "phongsinhhoc.jpg", char: "Mainson.png", text: "Thám tử, trông chìa khoá này rất quen… giống chìa khoá nhà Axton." }, // index 376
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Đây là chìa khoá phòng kho của tôi mà thôi." }, // index 377
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Kael cố gắng chen vào, muốn vươn tay ra cướp lấy chiếc chìa khóa nhưng lần nữa bị Heirlock giữ chặt." }, // index 378
  { bg: "phongsinhhoc.jpg", char: "Mainson.png", text: "Tôi sẽ mang về kiểm tra. Nếu không phải, sẽ trả lại ngay." }, // index 379
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Không được! Không được tự ý lấy đồ của tôi." }, // index 380
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Kael gào lên, gã gầm lớn như muốn đe dọa đối phương, chỉ tiếc rằng trước mắt gã khi này lại là một thám tử tư lão luyện và một tay cảnh sát chẳng biết sợ là gì." }, // index 381
  { bg: "phongsinhhoc.jpg", char: "Heirlock.png", text: "Vậy đưa tôi về nhà anh. Tôi sẽ thử dùng chìa khoá mở phòng kho. Nếu đúng chúng tôi trả lại. Chìa khóa một cách nguyên vẹn và gửi lời xin lỗi sâu sắc tới anh. Nếu không, đây sẽ là bằng chứng buộc tội anh." }, // index 382
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Kael luống cuống, tay run, giọng lắp bắp." }, // index 383
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Mainson, mau gọi cảnh sát tới, phong tỏa phòng sinh học." }, // index 384
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Ngay lập tức một nhóm cảnh sát tiến tới, một anh chàng nhìn thứ này ngắm nghĩa kĩ càng cùng với chiếc chìa khóa giống y hệt nằm trong túi zip mà họ đã lấy được từ hiện trường vụ án." }, // index 385
  { bg: "phongsinhhoc.jpg", char: "Cops.png", text: "Chìa khoá này giống hệt chìa khoá nhà nạn nhân." }, // index 386
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Kael giật mình, cố lắp bắp lời thanh minh." }, // index 387
  { bg: "phongsinhhoc.jpg", char: "Kael.png", text: "Thực ra đúng là Axton rớt chìa khoá trong lớp học vào tiết trước, tiết sau là tiết Sinh học của tôi. Tôi thấy nhưng chưa kịp trả, nghĩ tạm cầm về nhà để lần sau gặp lại rồi trả vì dạy xong tiết đó thầy Axton đã về thẳng nhà luôn. Việc tôi có chìa khoá tối hôm đó chỉ là trùng hợp mà thôi, mấy người phải tin tôi chứ." }, // index 388
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Heirlock đứng im, hắn không nói thêm điều gì nữa. Mọi bằng chứng rõ ràng đều quá rõ ràng chỉ về người thầy Sinh học Kael này, từ động cơ, cách thức gây án và cả kĩ thuật mổ xẻ chuyên môn được áp dụng lên thi thể nạn nhân nữa." }, // index 389
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Cảnh sát áp giải Kael ra khỏi phòng, từng bước chân vội vã vang trên sàn gạch ướt, vết bùn loang lổ theo sau." }, // index 390
  { bg: "phongsinhhoc.jpg", char: "Narrator", text: "Mainson thở dài, cậu nhìn theo bóng lưng của Kael đầy tiếc nuối." }, // index 391
  { bg: "phongsinhhoc.jpg", char: "Mainson.png", text: "Thám tử, ngài thấy không, chỉ vì người con gái mình yêu thân thiết với một người đàn ông khác, con người sẵn sàng làm những điều tàn bạo đến như vậy với chính giống loài của mình cơ mà." }, // index 392
  { bg: "phongsinhhoc.jpg", char: "Heirlock.png", text: "Heirlock quan sát, ánh mắt vẫn có chút gì đó lay động, hung thủ có thật sự là Kael không." }, // index 393
  { bg: "phongthamvan.jpg" }, // index 394
  { bg: "phongthamvan.jpg", char: "Narrator", text: "Trời vẫn còn mưa lất phất. Tiếng nước rơi đều trên khung cửa kính loang mờ ánh đèn neon nhạt." }, // index 395
  { bg: "phongthamvan.jpg", char: "Narrator", text: "Trong phòng thẩm vấn, ánh sáng trắng rọi thẳng xuống mặt Kael. Gã ngồi cúi đầu, hai tay đan vào nhau, khuôn mặt mệt mỏi." }, // index 396
  { bg: "phongthamvan.jpg", char: "Narrator", text: "Heirlock và Mainson đứng phía bên kia bàn, im lặng vài giây trước khi bắt đầu." }, // index 397
  { bg: "phongthamvan.jpg", char: "Heirlock.png", text: "Kael, anh hiểu vì sao chúng tôi giữ anh lại, đúng chứ?" }, // index 398
  { bg: "phongthamvan.jpg", char: "Kael.png", text: "Tôi đã nói rồi… tôi không làm gì cả. Tôi chỉ đến nói chuyện với cô ấy." }, // index 399
  { bg: "phongthamvan.jpg", char: "Heirlock.png", text: "Cô ấy, tức là Yanna?" }, // index 400
  { bg: "phongthamvan.jpg", char: "Kael.png", text: "Ừ. Chúng tôi cãi nhau, rồi tôi về nhà, chỉ có vậy thôi." }, // index 401
  { bg: "phongthamvan.jpg", char: "Narrator", text: "Giọng Kael nhỏ dần, run nhẹ. Mainson cầm tập hồ sơ, đặt mạnh xuống bàn." }, // index 402
  { bg: "phongthamvan.jpg", char: "Mainson.png", text: "Anh bảo về nhà lúc 18h hơn nhưng theo lời nhân chứng, Axton chết khoảng tám giờ tối. Hai tiếng trống đó, anh làm gì?" }, // index 403
  { bg: "phongthamvan.jpg", char: "Kael.png", text: "Tôi… tôi đi dạo. Không nhớ rõ nữa." }, // index 404
  { bg: "phongthamvan.jpg", char: "Mainson.png", text: "Đi dạo, lúc đó trời đang mưa lất phất đấy, anh đi dạo dưới trời mưa à?" }, // index 405
  { bg: "phongthamvan.jpg", char: "Narrator", text: "Kael im lặng. Ánh mắt gã lảng tránh đầy luống cuống. Heirlock bước tới, mở hồ sơ, giọng đều đều nhưng sắc lạnh." }, // index 406
  { bg: "phongthamvan.jpg", char: "Heirlock.png", text: "Vết siết cổ trên cổ nạn nhân cho thấy hung thủ không có chuyên môn." }, // index 407
  { bg: "phongthamvan.jpg", char: "Heirlock.png", text: "Hướng lực lệch phải nhưng không đều. Có tới ba vết chồng nhau." }, // index 408
  { bg: "phongthamvan.jpg", char: "Heirlock.png", text: "Điều này chỉ xảy ra khi người ra tay thấp bé hơn nạn nhân và vật lộn trong trạng thái hoảng loạn, và người đó thuận tay phải." }, // index 409
  { bg: "phongthamvan.jpg", char: "Narrator", text: "Kael siết chặt hai tay lại, cơ thể hắn khẽ run lên." }, // index 410
  { bg: "phongthamvan.jpg", char: "Heirlock.png", text: "Trùng hợp thay, anh thấp bé hơn Axton, và cũng là người thuận tay phải." }, // index 411
  { bg: "phongthamvan.jpg", char: "Heirlock.png", text: "Còn vết thương ở vùng kín được rạch quá gọn gàng để là một cơn mất kiểm soát hoàn toàn. Dụng cụ sắc, lực tay vừa đủ, cho thấy hung thủ biết mình đang làm gì, đây không phải hành động ngẫu nhiên." }, // index 412
  { bg: "phongthamvan.jpg", char: "Mainson.png", text: "Và chìa khoá." }, // index 413
  { bg: "phongthamvan.jpg", char: "Narrator", text: "Cậu tiếp lời, lật tờ biên bản, giọng rõ ràng, từng chữ nện xuống mặt bàn." }, // index 414
  { bg: "phongthamvan.jpg", char: "Mainson.png", text: "Chìa khoá nhà nạn nhân nằm trong túi áo anh. Trên chìa có dấu vân tay của hai người, anh và Axton, không ai khác." }, // index 415
  { bg: "phongthamvan.jpg", char: "Kael.png", text: "Tôi nói rồi. Tôi nhặt được nó trong lớp!" }, // index 416
  { bg: "phongthamvan.jpg", char: "Narrator", text: "Kael nói lớn như đang cố gắng thanh minh cho chính mình." }, // index 417
  { bg: "phongthamvan.jpg", char: "Heirlock.png", text: "Trùng hợp lạ lùng thật. Một người tình cờ có chìa khoá nhà nạn nhân, tình cờ không có chứng cứ ngoại phạm, tình cờ có dấu giày trùng hiện trường, tình cờ là người cuối cùng gặp nạn nhân còn sống và tình cờ trùng với mọi dấu vết trên thi thể nạn nhân." }, // index 418
  { bg: "phongthamvan.jpg", char: "Narrator", text: "Không khí trong phòng im lặng. Tiếng mưa bên ngoài như đang dội vào tâm trí Kael khiến gã tỏ rõ sự mệt mỏi, chỉ còn tiếng đồng hồ tích tắc." }, // index 419
  { bg: "phongthamvan.jpg", char: "Mainson.png", text: "Ngoài ra, chúng tôi đã kiểm tra lịch làm việc của nạn nhân. Axton và anh có hẹn gặp riêng chiều hôm đó, tại nhà Axton. Đúng không?" }, // index 420
  { bg: "phongthamvan.jpg", char: "Narrator", text: "Kael ngập ngừng một lúc rồi trả lời." }, // index 421
  { bg: "phongthamvan.jpg", char: "Kael.png", text: "Phải. Anh ta gọi tôi đến để trả vài tài liệu." }, // index 422
  { bg: "phongthamvan.jpg", char: "Heirlock.png", text: "Vậy là anh có lý do đến đó. Cửa không bị phá, không có dấu cạy. Nghĩa là hung thủ được mời vào. Anh ngồi xuống và Axton đã rót trà mời anh Kael như một chủ nhà lịch thiệp. Rồi sau một cuộc cãi vã, mọi thứ vượt quá giới hạn và anh ra tay." }, // index 423
  { bg: "phongthamvan.jpg", char: "Narrator", text: "Kael run lên, ánh mắt mờ đi, đôi môi mấp máy nhưng không phát ra tiếng. Gã nửa như muốn nói lại, nửa lại như đã buông bỏ." }, // index 424
  { bg: "phongthamvan.jpg", char: "Narrator", text: "Heirlock chậm rãi đóng hồ sơ lại, tiếng bìa da khép vang lên giữa phòng im ắng." }, // index 425
  {
        bg: "phongthamvan.png",
        char: "Heirlock.png",
        text: "Mainson, hung thủ…",
        choice: true,
        stayTrue: false,
        options: [
            { text: "Bắt giữ Kael", next: 427, end: 487 },
            { text: "Điều tra thêm", next: 488, end: 300000000000000000 },
        ],
    }, // index 426
  { bg: "phongthamvan.jpg", char: "Narrator", text: "Hắn dừng lại, nhìn thẳng Kael, ánh mắt lạnh lùng như lưỡi dao." }, // index 427
  { bg: "phongthamvan.jpg", char: "Heirlock.png", text: "Hung thủ chính là người đang ngồi trước mặt chúng ta." }, // index 428
  { bg: "phongthamvan.jpg", char: "Narrator", text: "Kael ngẩng phắt đầu, đôi mắt giật mạnh, hơi thở gấp gáp, gã gào lớn." }, // index 429
  { bg: "phongthamvan.jpg", char: "Kael.png", text: "Mẹ kiếp, lũ cảnh sát khốn nạn các người, tao không phải hung thủ, Lũ chết tiệt, chúng mày có nghe thấy không, tao không phải hung thủ." }, // index 430
  { bg: "phongthamvan.jpg", char: "Narrator", text: "Mainson im lặng, cúi xuống ký vào biên bản, giọng dứt khoát." }, // index 431
  { bg: "phongthamvan.jpg", char: "Mainson.png", text: "Tôi đồng ý với kết luận của Heirlock, tất cả đều khớp. Anh Kael, anh có thể mời luật sư sau và chúng ta sẽ nói chuyện rõ ràng hơn ở phiên tòa, còn bây giờ thì anh chịu khó bị tạm giam vậy." }, // index 432
  { bg: "phongthamvan.jpg", char: "Narrator", text: "Tiếng cửa mở, hai cảnh sát bước vào, còng tay Kael lại. Gã vùng vẫy, hét lên trong tuyệt vọng nhưng giọng nói dần bị tiếng mưa nuốt mất ngoài hành lang." }, // index 433
  { bg: "phongthamvan.jpg", char: "Narrator", text: "Heirlock vẫn đứng im, mắt dõi theo qua tấm kính mờ." }, // index 434
  { bg: "vanphong.jpg" }, // index 435
  { bg: "vanphong.jpg", char: "Narrator", text: "Hai tuần sau." }, // index 436
  { bg: "vanphong.jpg", char: "Narrator", text: "Trời vẫn mưa, như chưa bao giờ tạnh kể từ vụ án trước. Bên ngoài cửa sổ văn phòng, Heirlock ngồi trầm ngâm trước tách cà phê đã nguội." }, // index 437
  { bg: "vanphong.jpg", char: "Narrator", text: "Mọi thứ tưởng như đã kết thúc. Kael đã nhận tội, hồ sơ khép lại, báo chí thôi không nhắc đến nữa." }, // index 438
  { bg: "vanphong.jpg", char: "Narrator", text: "Nhưng buổi sáng hôm ấy, tiếng chuông điện thoại reo vang phá tan sự im lặng." }, // index 439
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Heirlock. Có án mạng mới. Nạn nhân tên… Yanna." }, // index 440
  { bg: "vanphong.jpg", char: "Narrator", text: "Tim hắn khựng lại." }, // index 441
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Yanna? Là con bé học sinh của Kael?" }, // index 442
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Phải. Là Yanna đó, anh mau tới đi, tôi rối quá, con bé nó chết thảm lắm, tôi sợ vụ án của Kael hình như không đơn giản tới vậy, rốt cuộc ai đã giết Yanna." }, // index 443
  { bg: "vanphong.jpg", char: "Narrator", text: "Hắn đứng bật dậy, khoác áo, vội vã rời khỏi văn phòng." }, // index 444
  { bg: "hientruongending1.jpg" }, // index 445
  { bg: "hientruongending1.jpg", char: "Narrator", text: "Khi Heirlock đến, đèn công an lập loè hắt sáng lên hai thi thể nằm giữa căn phòng nhỏ." }, // index 446
  { bg: "hientruongending1.jpg", char: "Narrator", text: "Yanna nằm sấp xuống sàn, một thanh sắt gỉ xuyên qua ngực." }, // index 447
  { bg: "hientruongending1.jpg", char: "Narrator", text: "Bên cạnh là người đàn ông tầm 25, có vẻ là công nhân, thi thể gập lại, bộ phận sinh dục bị chém giống hệt Axton." }, // index 448
  { bg: "hientruongending1.jpg", char: "Narrator", text: "Phần đầu của người công nhân bị chặt rời đặt ngay trước mặt Yanna, phần thân nằm ở góc phòng, máu khô loang lổ." }, // index 449
  { bg: "hientruongending1.jpg", char: "Mainson.png", text: "Hai nạn nhân. Có vẻ như người đàn ông cố cứu cô gái, nhưng cả hai đều chết gần như cùng lúc." }, // index 450
  { bg: "hientruongending1.jpg", char: "Heirlock.png", text: "Giờ tử vong?" }, // index 451
  { bg: "hientruongending1.jpg", char: "Mainson.png", text: "Có lẽ khoảng 23h đêm qua. Người báo tin là hàng xóm nghe tiếng động lớn." }, // index 452
  { bg: "hientruongending1.jpg", char: "Narrator", text: "Nói rồi Mainson liên tục nhìn vào chiếc đồng hồ trên tay mình." }, // index 453
  { bg: "hientruongending1.jpg", char: "Heirlock.png", text: "Cậu đang đợi ai à?" }, // index 454
  { bg: "hientruongending1.jpg", char: "Mainson.png", text: "Là Kam đó, sáng nay đã liên lạc bảo anh ta tới khám nghiệm thi thể đi mà chẳng thấy đâu." }, // index 455
  { bg: "hientruongending1.jpg", char: "Narrator", text: "Heirlock cúi xuống, nhìn quanh căn phòng ngăn nắp, tuy nhiên những vệt máu vẫn trải dài khắp nơi như một trận tàn sát không nương tay." }, // index 456
  { bg: "hientruongending1.jpg", char: "Người dân 1.png", text: "Tối qua tôi thấy có người lạ vào đây, đẹp trai lắm, ăn mặc lịch sự, trắng trẻo nữa." }, // index 457
  { bg: "hientruongending1.jpg", char: "Người dân 2.png", text: "Phải đó, nhìn như dân văn phòng, tóc đen bóng, vuốt keo gọn gàng, dáng cao ráo, đeo kính." }, // index 458
  { bg: "hientruongending1.jpg", char: "Heirlock.png", text: "Cậu vừa nói... anh ta đeo kính à?" }, // index 459
  { bg: "hientruongending1.jpg", char: "Người dân 2.png", text: "Phải. Đẹp trai lắm, nhìn kiểu tri thức ấy, tôi còn chẳng dám nghĩ sẽ gặp được một người như vậy ở cái khu này cơ." }, // index 460
  { bg: "hientruongending1.jpg", char: "Narrator", text: "Một hình ảnh thoáng vụt qua đầu Heirlock, chiếc áo blouse trắng, gọng kính bạc phản chiếu ánh đèn phòng khám nghiệm và nụ cười mệt mỏi nhưng hiền cùng đôi mắt đục ngầu." }, // index 461
  { bg: "hientruongending1.jpg", char: "Heirlock.png", text: "Không thể nào..." }, // index 462
  { bg: "hientruongending1.jpg", char: "Narrator", text: "Heirlock quay người bỏ chạy, mặc cho Mainson gọi với theo." }, // index 463
  { bg: "hientruongending1.jpg", char: "Mainson.png", text: "Này! Heirlock, anh đi đâu vậy?" }, // index 464
  { bg: "hientruongending1.jpg", char: "Narrator", text: "Nhưng Heirlock không đáp mà chỉ lao ra khỏi khu trọ, trời bắt đầu đổ mưa nặng hạt." }, // index 465
  { bg: "duongmua.jpg" }, // index 466
  { bg: "duongmua.jpg", char: "Narrator", text: "Đường đầy sình lầy, Heirlock bắt đầu chạy bộ giữa mưa, áo choàng dính sát vào người, tóc rũ ướt đẫm." }, // index 467
  { bg: "duongmua.jpg", char: "Narrator", text: "Phía trước là con đường dẫn về Cục Cảnh sát." }, // index 468
  { bg: "duongmua.jpg", char: "Narrator", text: "Rồi bỗng một bóng người vụt ra từ ngõ. Tiếng kim loại va vào đầu vang lên chát chúa. Mọi thứ tối sầm." }, // index 469
  { bg: "niggascreen.jpg" }, // index 470
  { bg: "tangham.jpg" }, // index 471
  { bg: "tangham.jpg", char: "Heirlock.png", text: "Da…rius?" }, // index 472
  { bg: "tangham.jpg", char: "Kam.png", text: "Tôi không định để mọi chuyện đi xa đến thế." }, // index 473
  { bg: "tangham.jpg", char: "Narrator", text: "Heirlock ngẩng đầu, Kam đứng đó, khoác áo blouse dính máu, ánh mắt lặng lẽ, nụ cười nhạt hệt như mọi khi trong phòng pháp y." }, // index 474
  { bg: "tangham.jpg", char: "Kam.png", text: "Kể ra nếu thám tử đừng dính vào vụ này, chúng ta đã có thể tiếp tục làm bạn tốt." }, // index 475
  { bg: "tangham.jpg", char: "Narrator", text: "Kam bước lại gần, rút con dao mổ sáng loáng từ túi áo. Mũi dao chạm nhẹ lên cổ Heirlock, để lại một vệt lạnh buốt." }, // index 476
  { bg: "tangham.jpg", char: "Kam.png", text: "Anh luôn giỏi hơn người khác, Heirlock. Nhưng có lẽ lần này, anh đoán sai rồi." }, // index 477
  { bg: "tangham.jpg", char: "Narrator", text: "Heirlock nhìn lên, đôi mắt mở to, kinh hoàng, hơi thở ngắt quãng. Dưới chân Kam là đôi giày da đen cỡ 44, in dấu bùn khô như hiện trường vụ Kael. Bàn tay phải Kam cầm con dao với vết sẹo nhỏ nơi cổ tay mà Heirlock nhớ rất rõ." }, // index 478
  { bg: "tangham.jpg", char: "Narrator", text: "Mọi thứ bỗng chậm lại. Trong đầu Heirlock vang lên những mảnh ký ức đứt đoạn, hung thủ thuận tay phải, thấp hơn nạn nhân, không có chuyên môn siết cổ." }, // index 479
  { bg: "tangham.jpg", char: "Kam.png", text: "Heirlock, căn phòng kín đó là do tôi, tôi đã lén đánh một chiếc chìa dự phòng giống hệt khi Axton để quên trên cục cảnh sát, sau đó trả lại. Kế hoạch trả thù đã được lập từ khi đó." }, // index 480
  { bg: "tangham.jpg", char: "Kam.png", text: "Và giờ nó đã hoàn thành rồi, em gái tôi cuối cùng cũng có thể thực sự yên nghỉ, xin lỗi anh rất nhiều, Heirlock." }, // index 481
  { bg: "tangham.jpg", char: "Kam.png", text: "Đáng lẽ ra tôi không nên giết anh, nhưng anh liên tục làm chậm tiến trình trả thù của tôi, nếu không phải tại anh thì tên Darius cũng không chết sớm như vậy, hắn xứng đáng phải chịu tra tấn ngày này qua ngày khác." }, // index 482
  { bg: "tangham.jpg", char: "Narrator", text: "Kam thở dài, anh nhẹ nhàng nhấn lên con dao khiến Heirlock đau nhói. Kael… bị đổ oan. Mọi âm thanh tắt lịm. Con dao vung lên, ánh sáng lướt qua trong tích tắc rồi tầm nhìn Heirlock tối đen." }, // index 483
  { bg: "tangham.jpg", char: "Narrator", text: "Kael… bị đổ oan." }, // index 484
  { bg: "tangham.jpg", char: "Narrator", text: "Mọi âm thanh tắt lịm. Con dao vung lên, ánh sáng lướt qua trong tích tắc rồi tầm nhìn Heirlock tối đen." }, // index 485
  { bg: "manhinhmau.jpg"}, // index 486
  { bg: "lannayanhdoansairoi.jpg"}, // index 487
  { bg: "phongthamvan.jpg", char: "Heirlock.png", text: "Mainson, hung thủ…" }, // 488
  { bg: "phongthamvan.jpg", char: "Narrator", text: "Mùi cà phê nguội lẫn trong không khí mệt mỏi. Heirlock ngồi dựa vào ghế, ngón tay gõ nhẹ lên mặt bàn kim loại." }, // 489
  { bg: "phongthamvan.jpg", char: "Narrator", text: "Phòng điều tra chìm trong ánh sáng trắng nhợt nhạt. Trên bàn, những tập hồ sơ mở tung, vài tấm ảnh hiện trường còn dính vệt máu khô." }, // 490
  { bg: "phongthamvan.jpg", char: "Narrator", text: "Hắn im lặng một hồi lâu rồi lên tiếng." }, // 491
  { bg: "phongthamvan.jpg", char: "Heirlock.png", text: "Có lẽ cần phải điều tra thêm." }, // 492
  { bg: "phongthamvan.jpg", char: "Narrator", text: "Nói rồi hắn đứng dậy, để mặc Kael ngơ ngác trong phòng thẩm vấn còn bản thân thì ra ngoài trước, Mainson cũng vội vã chạy theo sau." }, // 493
  { bg: "cuccanhsat.jpg" }, // 494
  { bg: "cuccanhsat.jpg", char: "Mainson.png", text: "Heirlock, anh…" }, // 495
  { bg: "cuccanhsat.jpg", char: "Narrator", text: "Mainson đứng bên cửa sổ, nhìn mưa trút xuống bên ngoài, chờ đợi hắn giải thích." }, // 496
  { bg: "cuccanhsat.jpg", char: "Heirlock.png", text: "Cậu nghĩ sao nếu tôi nói rằng Kael không phải hung thủ?" }, // 497
  { bg: "cuccanhsat.jpg", char: "Narrator", text: "Mainson im lặng rồi đột nhiên cậu trở nên nghiêm túc, hoàn toàn khác với dáng vẻ hiền lành thường ngày." }, // 498
  { bg: "cuccanhsat.jpg", char: "Mainson.png", text: "Tôi không ngạc nhiên lắm, Kael, gã ta không thể là hung thủ." }, // 499
  { bg: "cuccanhsat.jpg", char: "Mainson.png", text: "Không có tên hung thủ nào lại bốc đồng, luống cuống, sợ hãi, ngu ngốc và bị động như Kael cả, nhất là đối với vụ án lần này." }, // 500
  { bg: "cuccanhsat.jpg", char: "Heirlock.png", text: "Mọi thứ ấy quá thuận lợi, quá khớp với bằng chứng, quá hợp lý đến mức giả tạo." }, // 501
  { bg: "cuccanhsat.jpg", char: "Narrator", text: "Mainson nhíu mày, chống hai tay lên lan can, giọng trầm xuống." }, // 502
  { bg: "cuccanhsat.jpg", char: "Mainson.png", text: "Ý anh là sao?" }, // 503
  { bg: "cuccanhsat.jpg", char: "Heirlock.png", text: "Một người như Kael nếu thực sự giết người trong lúc mất kiểm soát thì hiện trường đã không thể gọn gàng đến vậy." }, // 504
  { bg: "cuccanhsat.jpg", char: "Heirlock.png", text: "Hắn ta không phải kẻ máu lạnh, càng không có kinh nghiệm trong trải qua thẩm vấn, dù bằng chứng đây là vụ án bộc phát nhưng hiện trường, chứng cứ, mọi thứ đều quá trật tự." }, // 505
  { bg: "cuccanhsat.jpg", char: "Narrator", text: "Mainson gật gù, quả thực mọi thứ đều thuận lợi một cách kì lạ, như thể đã bị ai sắp xếp trước vậy, và chúng ta chỉ là những con bò ngu ngốc được dắt đi khắp nơi và dừng chân lại trước Kael." }, // 506
  { bg: "cuccanhsat.jpg", char: "Mainson.png", text: "Còn chiếc chìa khóa thì sao? Dù sao nó cũng thực sự nằm trong túi áo Kael, không thể là trùng hợp." }, // 507
  { bg: "cuccanhsat.jpg", char: "Heirlock.png", text: "Chính điểm ấy mới khiến tôi thấy khó tin. Hung thủ giết người rồi khóa cửa từ trong, rõ ràng biết mình đang cầm vật chứng buộc tội vậy mà lại giữ nó?" }, // 508
  { bg: "cuccanhsat.jpg", char: "Heirlock.png", text: "Nếu là Kael thật thì gã đã vứt đi từ lâu. Tôi nghi có ai đó cố tình lập kế hoạch để gã cầm chiếc chìa khóa đó trên trường, nhằm dồn mọi nghi ngờ về một hướng." }, // 509
  { bg: "cuccanhsat.jpg", char: "Narrator", text: "Mainson nghi hoặc, muốn nói gì đó nhưng rồi lại thôi, rất may hắn nhanh chóng cảm nhận được điều đó mà tiếp lời." }, // 510
  { bg: "cuccanhsat.jpg", char: "Heirlock.png", text: "Cũng có thể là Axton thực sự chỉ rơi chìa khóa nhà trên lớp hợp trong tiết dạy cuối cùng của mình vì sơ xuất, và Kael vô tình trở thay kẻ thay thế, gánh mọi trách nhiệm." }, // 511
  { bg: "cuccanhsat.jpg", char: "Heirlock.png", text: "Hoặc cũng có thể Axton đã mất chìa từ trước, và bằng nào đó, vào đúng tiết dạy của Kael thì nó vô tình xuất hiện trên bàn giáo viên, nhưng điều đó quá khó để xảy ra, dù sao một người lạ cũng không thể tự do ra vào trường được." }, // 512
  { bg: "cuccanhsat.jpg", char: "Narrator", text: "Mainson im lặng vài giây, ánh nhìn dừng lại trên tấm hình Axton trong tập hồ sơ, khuôn mặt tím tái, vết siết đỏ hằn trên cổ." }, // 513
  { bg: "cuccanhsat.jpg", char: "Mainson.png", text: "Vậy để tôi đi hỏi Kam, có lẽ giờ này kết quả xét nghiệm ADN có hết cả rồi, tôi muốn xem ai có thể thao túng được cả bằng chứng để quay cảnh sát như chong chóng thế này." }, // 514
  { bg: "cuccanhsat.jpg", char: "Heirlock.png", text: "Để tôi đi cùng cậu." }, // 515
  { bg: "cuccanhsat.jpg", char: "Narrator", text: "Đi được vài bước đột nhiên hắn đứng lại khiến Mainson khó hiểu." }, // 516
  { bg: "cuccanhsat.jpg", char: "Heirlock.png", text: "Đợi tôi chút, tôi đã hứa với Kam lần sau gặp lại sẽ mời anh ấy cafe rồi." }, // 517
  { bg: "cuccanhsat.jpg", char: "Narrator", text: "Nói rồi hắn không đợi người kia kịp nói gì đã nhanh chóng xuống tầng 1, nơi có canteen dành cho những viên cảnh sát ở đây như thói quen, cứ như thể Heirlock đã quá quen thuộc với cục cảnh sát này, thậm chí còn thân thuộc hơn cả Mainson khiến cậu chỉ biết lắc đầu." }, // 518
  { bg: "cuccanhsat.jpg", char: "Narrator", text: "Mainson đã quen biết Heirlock từ khi cậu mới được phân công tới tổ 3 thực hiện điều tra các vụ án hình sự đặc biệt nghiêm trọng, vốn dĩ Heirlock đã từng kết hợp với những người đàn anh để hoàn thành nhiều trọng án." }, // 519
  { bg: "cuccanhsat.jpg", char: "Narrator", text: "Có lẽ cục cảnh sát này còn giống nhà của hắn còn hơn cái văn phòng thám tử xuề xòa thuê tạm bợ trong ngõ ngách đó nữa." }, // 520
  { bg: "cuccanhsat.jpg", char: "Narrator", text: "Heirlock nhanh chóng quay lại, trên tay là một cốc cafe sữa với… 2/3 chất lỏng trong đó là sữa đặc thay vì cafe khiến Mainson tròn mắt, cậu lắp bắp." }, // 521
  { bg: "cuccanhsat.jpg", char: "Mainson.png", text: "Anh gọi đây là cafe sữa sao, nó phải là sữa đặc đá thêm hậu vị cafe mới đúng." }, // 522
  { bg: "cuccanhsat.jpg", char: "Narrator", text: "Hắn bật cười, đôi mắt nheo lại khiến Mainson ngây người, đây là lần đầu tiên sau một thời gian dài quen biết cậu được thấy vị thám tử già đời này biết cười, có lẽ Heirlock rất thân thiết với vị pháp y Kam đó." }, // 523
  { bg: "cuccanhsat.jpg", char: "Heirlock.png", text: "Mainson của tôi, cậu không hiểu đâu, Kam nó thích kiểu cafe như này lắm đấy, thằng ngốc đó bao năm vẫn không bỏ được cái tật uống ngọt dù biết rõ là sẽ hại." }, // 524
  { bg: "cuccanhsat.jpg", char: "Mainson.png", text: "Hai người có vẻ rất thân thiết?" }, // 525
  { bg: "cuccanhsat.jpg", char: "Heirlock.png", text: "Phải, tôi chứng kiến tên đó từ khi mới chân ướt chân ráo chuyển công tác sang thành phố của mình, lúc nào cũng trưng cái vẻ mặt tôi sẽ không thèm làm thân với bất kì ai vậy mà cuối cùng giờ cũng biết cười rồi." }, // 526
  { bg: "cuccanhsat.jpg", char: "Narrator", text: "Mainson gật đầu, quả thực họ rất thân thiết, cậu nhanh chóng theo chân vị thám tử để tới phòng pháp y." }, // 527
  { bg: "phongphapy.jpg" }, // 528 
  { bg: "phongphapy.jpg", char: "Narrator", text: "Cánh cửa nặng nề mở ra, không kịp mở lời thì lần này Heirlock đã chủ động bước lên trước, đặt cốc sữa đặc đá lạnh thêm cafe của mình lên bàn rồi thong thả ngồi phịch xuống ghế." }, // 529
  { bg: "phongphapy.jpg", char: "Kam.png", text: "Anh thám tử của tôi hôm nay cần gì đây?" }, // 530
  { bg: "phongphapy.jpg", char: "Heirlock.png", text: "Xét nghiệm ADN chưa ra kết quả à?" }, // 531
  { bg: "phongphapy.jpg", char: "Kam.png", text: "Có rồi. Không tìm thấy dấu vết của Kael trên người nạn nhân, cả trong móng tay lẫn vết bầm. Anh còn nhớ không, Axton cao hơn Kael gần một cái đầu và thi thể lại có dấu hiệu chống cự." }, // 532
  { bg: "phongphapy.jpg", char: "Kam.png", text: "Một người to lớn bị siết cổ như thế đáng ra phải để lại ít nhất vài tế bào da của kẻ tấn công, nhưng không có gì hết, trong khi rõ ràng nếu anh ta muốn, Axton hoàn toàn đủ sức phản kháng lại Kael." }, // 533
  { bg: "phongphapy.jpg", char: "Mainson.png", text: "Có thể Kael đeo găng tay." }, // 534
  { bg: "phongphapy.jpg", char: "Narrator", text: "Heirlock đột nhiên lên tiếng." }, // 535
  { bg: "phongphapy.jpg", char: "Heirlock.png", text: "Nếu vậy gã phải mang cả bộ đồ bảo hộ để tránh dính máu, và lau sạch hiện trường không một lỗi. Nhưng Kael chỉ là giảng viên, gã không có kỹ năng hay tâm lý để làm việc đó." }, // 536
  { bg: "phongphapy.jpg", char: "Heirlock.png", text: "Hơn nữa, cậu nghĩ xem, với cách nói chuyện mất bình tĩnh như Kael liệu gã có thể làm mọi chuyện hoàn hảo đến vậy không?" }, // 537
  { bg: "phongphapy.jpg", char: "Narrator", text: "Mainson khoanh tay, hít sâu một hơi, giọng thấp xuống." }, // 538
  { bg: "phongphapy.jpg", char: "Mainson.png", text: "Còn dấu giày da cỡ 41?" }, // 539
  { bg: "phongphapy.jpg", char: "Heirlock.png", text: "Loại giày đó bán đầy ngoài phố, tôi đếm sơ cũng có hàng trăm người mang cùng cỡ. Hơn nữa nếu như đã có thể thu dọn hiện trường một cách hoàn hảo như vậy tại sao không lau nốt dấu giày." }, // 540
  { bg: "phongphapy.jpg", char: "Narrator", text: "Mainson ngưng lại một lúc." }, // 541
  { bg: "phongphapy.jpg", char: "Mainson.png", text: "Vậy theo anh, ai là hung thủ?" }, // 542
  { bg: "phongphapy.jpg", char: "Heirlock.png", text: "Tôi chưa biết. Nhưng chắc chắn có ai đó muốn chúng ta tin rằng Kael là kẻ giết người." }, // 543
  { bg: "phongphapy.jpg", char: "Narrator", text: "Một khoảng lặng kéo dài. Chỉ còn tiếng mưa đập vào cửa kính. Heirlock rời ghế, bước chậm tới bàn hồ sơ, lấy cây bút đỏ khoanh quanh dòng 'chìa khóa của nạn nhân'." }, // 544
  { bg: "phongphapy.jpg", char: "Heirlock.png", text: "Mainson, cậu cho người đi hỏi hàng xóm quanh nhà nạn nhân. Tôi muốn biết ai nghe hay thấy điều gì trong khung giờ tử vong." }, // 545
  { bg: "phongphapy.jpg", char: "Narrator", text: "Mainson gật đầu rồi nhanh chóng rời đi, trước khi bước ra tới cửa còn không quên cúi chào vị pháp y nãy giờ chỉ đang chăm chú khuấy cốc sữa đặc cafe của mình." }, // 546
  { bg: "phongphapy.jpg", char: "Heirlock.png", text: "Kam, cậu nghĩ sao về vụ án này?" }, // 547
  { bg: "phongphapy.jpg", char: "Narrator", text: "Anh ta nhún vai rồi uống một ngụm, đôi mắt đục ngầu đầy mệt mỏi đã dần có sức sống hơn." }, // 548
  { bg: "phongphapy.jpg", char: "Kam.png", text: "Tôi không rõ, đó chẳng phải là việc của thám tử và cánh sát sao, công việc của tôi chỉ là cung cấp bằng chứng về thi thể cho những người như anh, Heirlock." }, // 549
  { bg: "phongphapy.jpg", char: "Kam.png", text: "Anh thám tử của tôi, có lẽ anh nên về văn phòng nghỉ ngơi chút rồi đấy, nhìn quầng thâm trên mắt của anh kìa." }, // 550
  { bg: "phongphapy.jpg", char: "Narrator", text: "Nói rồi Kam tiến lại gần gắn, một mùi hương tanh tưởi của máu thoang thoảng quanh người anh khiến Heirlock rùng mình, tên này đã sống cùng tử thi quá lâu tới mức ám cả mùi rồi." }, // 551
  { bg: "phongphapy.jpg", char: "Kam.png", text: "Thám tử, thật sự cảm ơn anh." }, // 552
  { bg: "phongphapy.jpg", char: "Narrator", text: "Hắn ngước lên, khó hiểu nhìn về phía người đàn ông trước mặt." }, // 553
  { bg: "phongphapy.jpg", char: "Heirlock.png", text: "Vì điều gì?" }, // 554
  { bg: "phongphapy.jpg", char: "Kam.png", text: "Có lẽ là vì anh là một thám tử chăng?" }, // 555
  { bg: "phongphapy.jpg", char: "Heirlock.png", text: "Hả, cậu đang nói cái gì vậy?" }, // 556
  { bg: "phongphapy.jpg", char: "Kam.png", text: "Một thám tử chính trực luôn mong muốn sự thật được phơi bày ra ánh sáng, kẻ có tội phải bị trừng phạt và nạn nhân sẽ được yên nghỉ." }, // 557
  { bg: "phongphapy.jpg", char: "Narrator", text: "Ánh mắt Kam rũ xuống, mái tóc lòa xòa rối bù che đi phần nào biểu cảm trên khuôn mặt anh khiến Heirlock có một cảm giác kì lạ, có lẽ chỉ là thứ trực giác của một vị thám tử lâu năm nhưng hắn đã thực sự nghĩ con người trước mắt này có lẽ đã giết người." }, // 558
  { bg: "phongphapy.jpg", char: "Narrator", text: "Và có lẽ sẽ còn giết thêm rất nhiều người trong tương lai, Heirlock theo phản xạ mà đặt tay lên cán súng đang đeo trên thắt lưng mình như một phản xạ tự vệ." }, // 559
  { bg: "phongphapy.jpg", char: "Heirlock.png", text: "Kam, cậu…" }, // 560
  { bg: "phongphapy.jpg", char: "Kam.png", text: "Đừng lo lắng quá, ngài thám tử, hãy làm điều mà anh cho là đúng đắn đi, tôi ủng hộ anh, đó là lời thật lòng đấy." }, // 561
  { bg: "phongphapy.jpg", char: "Narrator", text: "Nói rồi đột nhiên Kam mỉm cười vui vẻ, đôi mắt chết chóc kia như chưa từng tồn tại mà trở nên lười biếng và mệt mỏi chẳng khác nào vị pháp y quen thuộc thường ngày làm Heirlock khó hiểu, cứ như những gì hắn vừa trải qua chỉ là một giấc mộng." }, // 562
  { bg: "phongphapy.jpg", char: "Kam.png", text: "Heirlock, anh thực sự nên về ngủ đó, tôi chỉ nói rằng tôi sẽ ủng hộ anh thôi mà, trông tôi đáng sợ lắm hay sao mà anh phải cầm súng thế kia?" }, // 563
  { bg: "phongphapy.jpg", char: "Heirlock.png", text: "À kh… không có gì, phải rồi, có lẽ tôi chỉ đang mệt mỏi thôi. Cảm ơn cậu nhé, tôi sẽ về văn phòng nghỉ ngơi một chút." }, // 564
  { bg: "vanphong.jpg" }, // 565
  { bg: "vanphong.jpg", char: "Narrator", text: "Hắn vừa trở về đã lập tức nằm vật ra ghế mà ngủ thiếp đi tới khi có tiếng gõ cửa vang lên cùng giọng nói quen thuộc." }, // 566
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Là tôi, Mainson đây, anh đang làm gì thế, Heirlock?" }, // 567
  { bg: "vanphong.jpg", char: "Narrator", text: "Hắn vội vàng ngồi dậy chỉnh lại bộ trang phục rồi nói lớn." }, // 568
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Vào đi!" }, // 569
  { bg: "vanphong.jpg", char: "Narrator", text: "Mainson bước vào với một xấp giấy trên tay, có lẽ báo cáo đã về. Mainson đọc chậm rãi, giọng khàn hơn thường ngày." }, // 570
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Có người nghe tiếng lạch cạch vào khoảng 20h35, hình như là tiếng khóa cửa. Sau đó im bặt." }, // 571
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Ước tính thời điểm tử vong là 20h30. Nếu 20h35 có tiếng khóa nghĩa là Kael thực sự đã trở về nhà 5 phút sau khi giết người? Không thể nào, vô lí, nhà gã và nạn nhân cách nhau tận 6km." }, // 572
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Khoảng thời gian ấy không thể đủ nếu Kael phải lau chùi, xóa dấu vết rồi chạy về nhà. Anh nói đúng, có điều gì đó không khớp." }, // 573
  { bg: "vanphong.jpg", char: "Narrator", text: "Hắn im lặng nhìn vào mốc thời gian được Mainson khoanh tròn trên cuốn sổ tay rồi lên tiếng." }, // 574
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Vậy đã khám xét nhà Kael chưa, kể cả thùng rác hay mọi nơi có thể xung quanh tòa nhà, có thứ gì đáng nghi không?" }, // 575
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Không, tôi đã lục soát toàn bộ căn hộ, thùng rác và cả khu vực quanh nhà. Không có dao phẫu thuật, không khăn lau, không găng tay." }, // 576
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Dù đã dùng luminol quét kỹ cũng không phát hiện vết máu nào, đây thực sự chỉ là một tòa nhà bình thường, không ai thấy điều gì khác trong ngày hôm đó hết." }, // 577
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Hung thủ giấu hung khí quá kỹ, hoặc đã mang theo đi xa." }, // 578
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Và chỉ một người đủ hiểu quy trình điều tra mới biết cần xóa sạch đến thế. Kael không có kiến thức đó." }, // 579
  { bg: "vanphong.jpg", char: "Narrator", text: "Heirlock dừng lại, giọng ông trầm xuống, như đang tự nói với chính mình." }, // 580
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Chưa đủ bằng chứng để kết tội Kael. Mọi thứ quá hoàn hảo, như thể ai đó đã sắp đặt sẵn từng chi tiết." }, // 581
  { bg: "vanphong.jpg", char: "Narrator", text: "Mainson ngẩng lên, nhìn hắn với vẻ lo lắng. Ngoài kia sấm rền nhẹ, mưa vẫn chưa dứt." }, // 582
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Anh định nói… có kẻ khác đang đứng sau chuyện này sao?" }, // 583
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Tôi không định nói, tôi chắc chắn là vậy. Ai đó đã khiến chúng ta nhìn sai hướng." }, // 584
  { bg: "vanphong.jpg", char: "Narrator", text: "Heirlock chỉ vào mục bằng chứng trên tài liệu." }, // 585
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Một kẻ nào đó đủ cẩn thận để dọn mọi ADN có thể sót lại trong một hiện trường giết người tàn khốc nhưng có thể vô ý tới nỗi để lại dấu giày da, cuốn sổ tay có ghi lịch trình gặp một người khác vào tối hôm đó." }, // 586
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Nếu là Kael, ít nhất hắn cũng phải biết xóa dấu giày của mình chứ, hay là sổ tay ghi bên ngoài rõ là lịch trình rồi, vậy lại có kẻ nằm trong kế hoạch gặp mặt nào đó ngu ngốc tới nỗi để nguyên lại mà không thủ tiêu sao." }, // 587
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Để đó cho tất cả mọi người đều biết ngày hôm ấy, nạn nhân đã hẹn gặp mình tại nhà riêng?" }, // 588
  { bg: "vanphong.jpg", char: "Narrator", text: "Mainson gật đầu, quả thực, đang có kẻ nào đó điều khiển mọi chuyện." }, // 589
  { bg: "vanphong.jpg", char: "Narrator", text: "Ánh sáng lóe qua cửa kính, soi rõ khuôn mặt của hai người, cả hai đều hiểu rằng vụ án này mới chỉ bắt đầu mở ra." }, // 590
  { bg: "duongmua.jpg" }, // 591 
  { bg: "duongmua.jpg", char: "Narrator", text: "Mưa rả rích ngoài cửa sổ, ánh đèn vàng nhạt hắt xuống nền nhà ẩm mốc. Heirlock và Mainson bước nhẹ trên bậc thang sảnh tòa nhà rồi dừng bước ở trước căn hộ số 12, chủ của căn nhà mà nạn nhân Axton đã thuê, đồng thời cũng là hiện trường vụ án." }, // 592
  { bg: "duongmua.jpg", char: "Narrator", text: "Mainson gõ lên cánh cửa gỗ sẫm màu vài lần." }, // 593
  { bg: "duongmua.jpg", char: "Narrator", text: "Cánh cửa mở ra từ bên trong, một người đàn ông trung niên bước ra. Ánh mắt ông dừng lại trên những vị khách không mời mà đến, tỏ rõ vẻ bất ngờ và sự nghi ngại." }, // 594
  { bg: "duongmua.jpg", char: "Nguoidan1.png", text: "Hai người là…" }, // 595
  { bg: "duongmua.jpg", char: "Mainson.png", text: "Chào ông, tôi là Mainson, cảnh sát đang điều tra vụ án Axton còn đây là anh Heirlock, thám tử tư. Chúng tôi chỉ muốn hỏi một số thông tin liên quan đến thầy Axton, hy vọng ông có thể giúp." }, // 596
  { bg: "duongmua.jpg", char: "Narrator", text: "Người đàn ông cau mày, ánh mắt thoáng lạnh lùng như đang nhớ lại những lần bị quấy rầy không ngớt sau khi vụ án đó xảy ra." }, // 597
  { bg: "duongmua.jpg", char: "Nguoidan1.png", text: "Ồ, tôi biết rồi, trước đây đã có cảnh sát tới hỏi rất nhiều lần." }, // 598
  { bg: "duongmua.jpg", char: "Nguoidan1.png", text: "Mấy người không thể hỏi một lượt hết được à, dăm bữa lại tới một lần, thật sự rất phiền đấy anh cảnh sát à." }, // 599
  { bg: "duongmua.jpg", char: "Narrator", text: "Ông ta nhíu mày cùng ánh mắt bực bội hướng về phía cậu làm Mainson lúng túng." }, // 600
  { bg: "duongmua.jpg", char: "Narrator", text: "Cậu cố gắng giữ bình tĩnh và sự chuyên nghiệp mà mỉm cười nhẹ, điềm tĩnh nói." }, // 601
  { bg: "duongmua.jpg", char: "Mainson.png", text: "Xin thông cảm thưa ông. Chúng tôi hiểu cảm giác đó. Tuy nhiên vụ án này còn nhiều khúc mắc và chúng tôi chỉ muốn tìm ra sự thật, sẽ không làm phiền ông quá nhiều đâu." }, // 602
  { bg: "duongmua.jpg", char: "Nguoidan1.png", text: "Ừ thôi được rồi. Các anh cứ vào, tôi sẽ nói hết những gì tôi biết." }, // 603
  { bg: "canhochunhaAxton.jpg" }, // 604
  { bg: "canhochunhaAxton.jpg", char: "Narrator", text: "Cậu gật đầu, lịch sự cúi chào trước khi bước vào còn hắn đi theo sau, ánh mắt lướt qua căn hộ ấm áp nhưng tĩnh lặng ấy." }, // 605
  { bg: "canhochunhaAxton.jpg", char: "Narrator", text: "Nơi này trưng bày đơn giản, người đàn ông vừa đóng cửa lại liền lớn tiếng gọi vọng vào trong nhà." }, // 606
  { bg: "canhochunhaAxton.jpg", char: "Nguoidan1.png", text: "Em ơi, ra đây, cảnh sát tới hỏi về cậu trai đó kìa." }, // 607
  { bg: "canhochunhaAxton.jpg", char: "Narrator", text: "Một người phụ nữ với vóc dáng mảnh mai cùng mái tóc đen tuyền được búi gọn dáng phía sau đầu xuất hiện, giọng nói mềm mại." }, // 608
  { bg: "canhochunhaAxton.jpg", char: "Nguoidan2.png", text: "Vâng, hai anh cảnh sát muốn hỏi về người thuê Axton, phải chứ?" }, // 609
  { bg: "canhochunhaAxton.jpg", char: "Narrator", text: "Ngồi xuống sofa, Mainson nhẹ nhàng bắt đầu câu hỏi, giọng điềm tĩnh khiến người đàn ông bớt căng thẳng." }, // 610
  { bg: "canhochunhaAxton.jpg", char: "Mainson.png", text: "Chúng tôi muốn biết thời gian gần đây Axton có gặp ai thường xuyên không, có ai tới nhà anh ta không hay có điều gì khác thường xung quanh nạn nhân?" }, // 611
  { bg: "canhochunhaAxton.jpg", char: "Nguoidan1.png", text: "À… cậu ấy hiền lành, ít nói nhưng tử tế. Không bao giờ làm ồn hay gây rắc rối." }, // 612
  { bg: "canhochunhaAxton.jpg", char: "Nguoidan2.png", text: "Cũng có vài lần cậu ta dẫn một cô bé mặc đồng phục học sinh tới, nhưng hai người chỉ ngồi cafe và dạy học thôi." }, // 613
  { bg: "canhochunhaAxton.jpg", char: "Narrator", text: "Như đã nắm bắt được điểm khác lạ trong câu chuyện, Heirlock nhìn về hướng người vợ." }, // 614
  { bg: "canhochunhaAxton.jpg", char: "Heirlock.png", text: "Bà có nhớ cô bé đó ngoại hình ra sao không?" }, // 615
  { bg: "canhochunhaAxton.jpg", char: "Nguoidan2.png", text: "Để tôi nhớ lại một chút." }, // 616
  { bg: "canhochunhaAxton.jpg", char: "Narrator", text: "Bà ta trầm ngâm một hồi rồi chợt à lên một tiếng." }, // 617
  { bg: "canhochunhaAxton.jpg", char: "Nguoidan2.png", text: "Phải rồi, cô bé đó mặc đồng phục trường K.K ở rìa thành phố, với cả có mái tóc màu hồng rất nổi bật nữa. Còn lại tôi cũng không nhớ rõ lắm." }, // 618
  { bg: "canhochunhaAxton.jpg", char: "Narrator", text: "Mainson quay sang nhìn Heirlock như ra hiệu, hắn gật đầu. Là Yanna, cô bé ngoan ngoãn bị người thầy giáo Kael đeo bám đó." }, // 619
  { bg: "canhochunhaAxton.jpg", char: "Narrator", text: "Vậy là đúng theo những gì Kael nói, thầy Axton và Yanna thực sự thân thiết vượt mức bình thường rất nhiều." }, // 620
  { bg: "canhochunhaAxton.jpg", char: "Heirlock.png", text: "Cô bé đó thường tới khi nào?" }, // 621
  { bg: "canhochunhaAxton.jpg", char: "Nguoidan2.png", text: "Tầm sau 17h chiều, có lẽ là giờ tan học chăng. Nhưng cậu ấy không đưa cô bé lên căn hộ đâu, chỉ ra quán cà phê đầu ngõ, ngồi tí rồi thôi." }, // 622
  { bg: "canhochunhaAxton.jpg", char: "Narrator", text: "Mainson ghi chép, nhẹ nhàng đặt câu tiếp." }, // 623
  { bg: "canhochunhaAxton.jpg", char: "Mainson.png", text: "Ngoài cô bé đó, Axton có bao giờ đưa ai khác vào nhà không?" }, // 624
  { bg: "canhochunhaAxton.jpg", char: "Nguoidan1.png", text: "Không hề. Cậu ấy sống khép kín, chỉ duy nhất vài lần như thế thôi." }, // 625
  { bg: "canhochunhaAxton.jpg", char: "Narrator", text: "Heirlock nghĩ có lẽ đã hết thứ để hỏi ở cặp vợ chồng này rồi thì đột nhiên người chồng như nhớ ra điều gì đó, ồ lên một tiếng." }, // 626
  { bg: "canhochunhaAxton.jpg", char: "Nguoidan1.png", text: "À, tầm mấy tháng trước Axton có than bị mất chìa khóa căn hộ, phải gọi thợ khóa vì tìm mãi không ra." }, // 627
  { bg: "canhochunhaAxton.jpg", char: "Narrator", text: "Mainson nhíu mày, ánh mắt sáng lên sự chú ý, mất chìa khóa và vụ án phòng kín, cuối cùng thì cũng có lời lí giải cho việc Kael bị oan rồi." }, // 628
  { bg: "canhochunhaAxton.jpg", char: "Narrator", text: "Nếu như khoảng thời gian Axton mất chìa là do có kẻ chủ đích trộm thì nó hoàn toàn giải thích được cho vụ án căn phòng kín này." }, // 629
  { bg: "canhochunhaAxton.jpg", char: "Nguoidan1.png", text: "Sau đó tôi cũng có tới tìm giúp cậu ấy, dù sao phải đền chìa cũng mất thời gian và tiền bạc nữa nhưng không thấy, một hôm Axton nói với tôi cậu ấy lại vô tình thấy chìa khóa rơi gần bệ cửa." }, // 630
  { bg: "canhochunhaAxton.jpg", char: "Nguoidan1.png", text: "Nơi ai cũng nhìn thấy dễ dàng như vậy tại sao trước giờ không ai thấy. Axton bảo không hiểu sao tìm mãi không ra, thậm chí thợ khóa cũng không thấy." }, // 631
  { bg: "canhochunhaAxton.jpg", char: "Nguoidan2.png", text: "Kể từ đó cậu ấy có thêm một chìa khóa mới. Còn cái chìa cũ bây giờ lại xuất hiện." }, // 632
  { bg: "canhochunhaAxton.jpg", char: "Heirlock.png", text: "Vậy là trước vụ án, cậu ấy có hai chìa khóa, một cũ một mới." }, // 633
  { bg: "canhochunhaAxton.jpg", char: "Narrator", text: "Người đàn ông lặng đi một chút, ông ta nâng chiếc tách sứ trên bàn lên nhấp một ngụm trà, ánh mắt nhìn ra cửa sổ mưa." }, // 634
  { bg: "canhochunhaAxton.jpg", char: "Nguoidan1.png", text: "Axton hiếm khi tiếp xúc với hàng xóm. Cậu ấy lịch sự, yên lặng và chưa hề gây mâu thuẫn gì với ai, cũng chỉ duy nhất có cô bé đó là xuất hiện cùng với cậu ta." }, // 635
  { bg: "canhochunhaAxton.jpg", char: "Narrator", text: "Heirlock nhìn về phía cộng sự của mình để ra hiệu, câu nhanh chóng hiểu ý mà đứng dậy, mỉm cười chìa tay ra." }, // 636
  { bg: "canhochunhaAxton.jpg", char: "Mainson.png", text: "Cảm ơn ông bà đã chia sẻ, những thông tin này rất quan trọng." }, // 637
  { bg: "canhochunhaAxton.jpg", char: "Nguoidan2.png", text: "Chúng tôi hy vọng các anh sẽ tìm ra sự thật. Axton là người tốt, cậu ta không đáng xảy ra chuyện này." }, // 638
  { bg: "duongmua.jpg" }, // 639
  { bg: "duongmua.jpg", char: "Narrator", text: "Mainson và Heirlock rời khỏi căn hộ, tiếng mưa vẫn rơi đều đặn dội vào tai hắn. Có quá nhiều nghi vấn xung quanh cái chết của Axton, hiện giờ chẳng khác nào phải điều tra lại từ đầu." }, // 640
  { bg: "duongmua.jpg", char: "Narrator", text: "Heirlock nhìn Mainson, ánh mắt trầm tư nhìn trời mưa lất phất bên ngoài." }, // 641
  { bg: "duongmua.jpg", char: "Heirlock.png", text: "Chúng ta nên tới trường, hỏi cô bé Yanna về Axton nhiều hơn, dù sao hiện giờ mối quan hệ duy nhất còn lại của Axton có vẻ thân thiết hơn cũng chỉ còn con bé này." }, // 642
  { bg: "duongmua.jpg", char: "Narrator", text: "Heirlock thở dài một hơi, cuộc điều tra càng cố tiến vào sâu hơn hình như lại càng trở nên bế tắc khiến hắn mệt mỏi." }, // 643
  { bg: "duongmua.jpg", char: "Mainson.png", text: "Đồng ý, mọi mối quan hệ của Axton gần đây đều cần làm rõ, chúng ta sẽ lên trường thôi." }, // 644
  { bg: "duongmua.jpg", char: "Narrator", text: "Heirlock nhìn lên trên, hình như trời đang tạnh mưa, những tia nắng bắt đầu le lói phía sau lớp mây đen mù mịt kia. Hắn nghĩ liệu đây có phải là dấu hiệu tốt hay không." }, // 645
  { bg: "santruong.jpg" }, // 646
  { bg: "santruong.jpg", char: "Narrator", text: "Buổi chiều muộn phủ màu vàng nhạt lên sân trường, nắng nghiêng qua hành lang khiến bóng hai người kéo dài trên nền gạch." }, // 647
  { bg: "santruong.jpg", char: "Narrator", text: "Không khí ồn ào xung quanh dường như không thể hòa vào bước chân chậm rãi ấy như thể hắn và cậu đang đi ngược với dòng người nơi này." }, // 648
  { bg: "lophoc.jpg" }, // 649
  { bg: "lophoc.jpg", char: "Narrator", text: "Heirlock và Mainson bước vào lớp học, học sinh nhìn họ với ánh mắt tò mò, vài người còn xì xào sau lưng." }, // 650
  { bg: "lophoc.jpg", char: "Heirlock.png", text: "Yanna, em có thể ra ngoài một chút được không, chúng tôi muốn trao đổi vài câu hỏi về Axton." }, // 651
  { bg: "lophoc.jpg", char: "Narrator", text: "Yanna khẽ ngượng khi lại gặp hai vị cảnh sát này thêm một lần nữa liền nhanh chóng bước tới, mái tóc hồng khẽ bay theo làn gió mát sau cơn mưa khiến Heirlock ngây người, trong một chốc hắn cũng hiểu tại sao cô bé này lại được nhiều người yêu quý tới vậy." }, // 652
  { bg: "lophoc.jpg", char: "Narrator", text: "Khuôn mặt xinh đẹp dễ mến, mái tóc hồng ấn tượng, thành tích học tập xuất sắc và cả thứ mùi hương của hoa nhài khó quên ấy cứ lảng vảng xung quanh hắn." }, // 653
  { bg: "lophoc.jpg", char: "Yanna.png", text: "Dạ!" }, // 654
  { bg: "lophoc.jpg", char: "Mainson.png", text: "Chúng tôi sẽ lên phòng giáo viên trước, em cứ chuẩn bị ra đó khi xong việc của mình, được không?" }, // 655
  { bg: "lophoc.jpg", char: "Yanna.png", text: "Vâng, em sẽ đợi ở ngoài." }, // 656
  { bg: "lophoc.jpg", char: "Narrator", text: "Heirlock và Mainson đi về hướng phòng giáo viên, bước qua hành lang lớp học lác đác tiếng học sinh thì thầm về việc Kael vẫn đang bị tạm giam." }, // 657
  { bg: "lophoc.jpg", char: "Mainson.png", text: "Không khí ở đây căng thẳng hơn dự đoán, có vẻ Kael trở thành tâm điểm mọi ánh mắt rồi, nhất là còn bị học sinh nói ra vào nữa." }, // 658
  { bg: "lophoc.jpg", char: "Heirlock.png", text: "Ừ vậy nên chúng ta phải nhanh chóng giải quyết được vụ án này và trả lại sự trong sạch cho gã ta." }, // 659
  { bg: "lophoc.jpg", char: "Narrator", text: "Heirlock thở dài một tiếng rồi tiếp." }, // 660
  { bg: "lophoc.jpg", char: "Heirlock.png", text: "Kael, gã là một tên ngu ngốc nhưng không thể là kẻ giết người. Lần này nói chuyện với Yanna chúng ta cần biết rõ Axton thời gian gần đây như thế nào, ai tiếp xúc với cậu ấy và có biểu hiện gì lạ không." }, // 661
  { bg: "phonggiaovien.jpg" }, // 662
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Hai người lên tới phòng giáo viên, Heirlock nhìn quanh, căn phòng yên tĩnh hơn lớp học với ánh sáng nhạt hắt qua cửa sổ." }, // 663
  { bg: "phonggiaovien.jpg", char: "Yanna.png", text: "Là em, Yanna đây ạ!" }, // 664
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Yanna à, vào đi!" }, // 665
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Yanna bước vào phòng rồi như một thói quen mà ngồi xuống chiếc ghế ở đối diện với Heirlock, hoàn toàn không liếc mắt nhìn sang Mainson dù chỉ một chút khiến cậu dài mặt tiếc nuối." }, // 666
  { bg: "phonggiaovien.jpg", char: "Yanna.png", text: "Dạ, anh cảnh sát và ngài thám tử cần hỏi thêm về chuyện gì ạ?" }, // 667
  { bg: "phonggiaovien.jpg", char: "Mainson.png", text: "Em có gặp thầy Axton thường xuyên không, thời gian gần đây có điều gì khác thường không, hay cậu ấy có mối quan hệ với ai khác mà em cảm thấy bất thường không?" }, // 668
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Một loạt câu hỏi dồn dập ập tới khiến cô bé tóc hồng choáng váng mà ấp úng làm Heirlock quay sang lườm người cộng sự của mình thay cho lời đe dọa." }, // 669
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Em cứ bình tĩnh thôi, thời gian gần đây Axton có biểu hiện gì kì lạ không, như suy sụp, mệt mỏi, sợ hãi hay kể cả hưng phấn chẳng hạn?" }, // 670
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Người con gái ấy suy nghĩ một hồi rồi lắc đầu." }, // 671
  { bg: "phonggiaovien.jpg", char: "Yanna.png", text: "Không, thầy Axton vẫn luôn như thế mà." }, // 672
  { bg: "phonggiaovien.jpg", char: "Mainson.png", text: "Vậy mối quan hệ giữa em và thầy Axton thì sao, tôi thấy mỗi khi em nhắc về người thầy này đều lộ ra chút vui vẻ." }, // 673
  { bg: "phonggiaovien.jpg", char: "Yanna.png", text: "Em với thầy Axton chỉ là thầy trò thôi, em có tới nhà thầy ấy vì đã nhờ thầy giảng bài nhưng chưa bao giờ có bất kì điều gì vượt qua ngưỡng thầy trò cả." }, // 674
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Em có biết Axton có tiếp xúc với ai khác ngoài em không, hay có ai tới nhà thầy ấy gần đây chẳng hạn?" }, // 675
  { bg: "phonggiaovien.jpg", char: "Yanna.png", text: "Không, em không biết gì, em chỉ gặp thầy ở lớp hoặc quán cà phê, không có gì khác." }, // 676
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Mainson bận ghi chép cẩn thận, ánh mắt Heirlock quan sát Yanna, dù cho những điều con bé này nói đều khiến hắn cảm thấy sự thẳng thắn và không hề né tránh, với kinh nghiệm của một thám tử lâu năm như Heirlock, hắn có thể chắc rằng những gì Yanna nói ra đều là sự thật." }, // 677
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Nhưng đằng sau sự thật đó còn những gì thì có vẻ dù cho có gặng hỏi bao nhiêu Yanna cũng sẽ không trả lời." }, // 678
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Bỗng có tiếng gõ cửa, một cậu học sinh với mái tóc ngắn gọn gàng bước vào, giọng khẩn trương gọi Yanna." }, // 679
  { bg: "phonggiaovien.jpg", char: "Crow.png", text: "Yanna cần về không, nếu trễ chuyến bus là muộn mất." }, // 680
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Ngay khi vừa nhìn cậu trai kia xuất hiện trước cửa, Yanna liền đứng bật dậy mặc cho Heirlock và Mainson còn chưa kịp phản ứng." }, // 681
  { bg: "phonggiaovien.jpg", char: "Yanna.png", text: "Crow! Em về đây, xin phép hai người, em cần phải về sớm trước khi muộn chuyến bus cuối cùng. Nếu anh cảnh sát và quý ngài thám tử đây cần thêm điều gì xin hãy chọn tới trường vào buổi sáng." }, // 682
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Yanna quay về phía Heirlock và Mainson, cúi đầu nhẹ rồi rời đi." }, // 683
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Crow là tên cậu trai vừa rồi toan đi theo nhưng Heirlock đã gọi lại." }, // 684
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Crow, cậu là bạn cùng lớp của Yanna?" }, // 685
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Mái tóc ngắn được cắt gọn gàng cùng với khuôn mặt hiền lành và đôi mắt lớn khiến cho thân hình Crow dù có to lớn cũng không gây ra sự căng thẳng cho đối phương." }, // 686
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Crow, cậu có biết gì về quan hệ giữa Yanna và Axton không?" }, // 687
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Đôi mắt nâu nhạt ấy khẽ co lại như đang cố gắng nhờ về thứ gì đó nhưng rồi lại lắc đầu." }, // 688
  { bg: "phonggiaovien.jpg", char: "Crow.png", text: "Anh cảnh sát, em chỉ biết Yanna ở trong nhóm thi đua của trường vậy nên thường xuyên nhờ thầy Axton dạy kèm thôi." }, // 689
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Vậy Yanna đã ở đâu vào lúc 20h…" }, // 690
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Lời nói của Heirlock còn chưa hết hẳn đã hoàn toàn bị chặn lại bởi ánh mắt soi xét từ phía Crow, cậu ta nhíu mày tỏ vẻ không thoải mái." }, // 691
  { bg: "phonggiaovien.jpg", char: "Crow.png", text: "Ý anh cảnh sát là bạn gái tôi giết thầy Axton, một người giáo viên luôn hết mức giúp đỡ em ấy?" }, // 692
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Mainson vội vàng muốn chữa cháy nhưng đã bị Heirlock ngăn lại, hắn tiếp tục hỏi." }, // 693
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Cậu trai trẻ, thám tử và cảnh sát là công việc phải nghi ngờ tất cả những sinh vật sống ở xung quanh nạn nhân, tất nhiên cậu có lựa chọn không đưa ra thông tin nhưng vậy thì cũng phải chấp nhận rằng Yanna có thể có tin đồn giết thầy Axton vì đã không dám chứng minh chứng cứ ngoại phạm." }, // 694
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Crow nắm chặt lòng bàn tay nhưng rồi rất nhanh trở về trạng thái bình thường mà cười trừ, một tay vò rối tung mái tóc của mình lên." }, // 695
  { bg: "phonggiaovien.jpg", char: "Crow.png", text: "Em không rõ lắm, nhưng chắc chắn Yanna không ở hiện trường khi Axton chết, em ấy rời khỏi đó rồi. Yanna sẽ không đời nào làm những việc như vậy." }, // 696
  { bg: "phonggiaovien.jpg", char: "Narrator", text: "Nói rồi Crow nắm tay Yanna và dẫn cô ra khỏi phòng giáo viên, để lại Heirlock và Mainson." }, // 697
  { bg: "phonggiaovien.jpg", char: "Heirlock.png", text: "Mọi chi tiết tưởng bình thường cũng có thể quan trọng, thời gian và mối quan hệ của Axton cần đối chiếu thêm với nhiều đối tượng nữa, nhưng xem ra quả thực Yanna cũng chẳng có dính dáng gì tới cái chết này rồi." }, // 698
  { bg: "vanphong.jpg" }, // 699
  { bg: "vanphong.jpg", char: "Narrator", text: "Heirlock và Mainson ngồi dưới sàn giữa đống hồ sơ, vò đầu bứt tóc giữa đống hồ sơ chồng chất, giấy tờ rải khắp sàn, thông tin thì dày đặc nhưng chẳng có gì thực sự đáng để phân tích hay khai thác, mỗi chi tiết đều dừng lại ở mức suy đoán." }, // 700
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Anh biết không, Kael đã được thả rồi, không còn bị tạm giam nữa." }, // 701
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Vậy nghĩa là không còn bằng chứng buộc tội cậu ta nữa." }, // 702
  { bg: "vanphong.jpg", char: "Narrator", text: "Heirlock gật gù, tay vẫn không quên đọc đi đọc lại báo cáo pháp y trên tay như muốn học thuộc từng dấu chấm dấy phẩy trong đó." }, // 703
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Đúng vậy, nhưng ở trường thì vẫn loạn lắm, học sinh thích tin đồn hơn là nghe sự thật, gã ta chưa quay lại dạy mà đang ở nhà tĩnh dưỡng." }, // 704
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Vậy là Kael chưa chịu trở lại giảng dạy và mọi chuyện vẫn đang rối ren trong đầu học sinh, phải chứ?" }, // 705
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Đúng, tin đồn tràn lan, chẳng ai biết đâu là thật đâu là giả khiến không khí ở trường càng thêm căng thẳng." }, // 706
  { bg: "vanphong.jpg", char: "Narrator", text: "Heirlock mệt mỏi dựa lưng ra phía sau nhưng rồi nhận ra hắn chỉ có thể nằm ngửa ra sàn chứ đã chẳng còn miệng đệm êm ái nào để tựa nữa." }, // 707
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Chúng ta cần phải tính tới khả năng những tin đồn này sẽ ảnh hưởng tới quá trình điều tra, đặc biệt khi Kael chưa thể trở lại làm việc." }, // 708
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Tôi lo là học sinh còn bàn tán có thể tạo thêm hiểu lầm hoặc suy diễn sai, và mọi chuyện sẽ càng phức tạp." }, // 709
  { bg: "vanphong.jpg", char: "Narrator", text: "Hai người nhìn nhau, im lặng một lúc giữa đống hồ sơ và ánh sáng nhạt hắt qua cửa sổ, cả hai đều hiểu rằng tình hình chưa hề sáng tỏ, Kael vừa được giải thoát khỏi tạm giam nhưng những vấn đề từ vụ án vẫn còn chất đống." }, // 710
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Anh nghĩ sao, Heirlock, chúng ta đã hỏi hết hàng xóm, thẩm vấn Yanna, đối chiếu mọi dữ liệu, nhưng vẫn chẳng tìm ra manh mối gì đáng kể cả." }, // 711
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Quá nhiều khoảng trống, mỗi manh mối đều ngắn và rời rạc, như một trò chơi xếp hình mà thiếu mất mảnh quan trọng." }, // 712
  { bg: "vanphong.jpg", char: "Narrator", text: "Đột nhiên điện thoại reo, Mainson nhanh tay nhấc máy, giọng trầm trầm của Thượng tá Darius vang lên." }, // 713
  { bg: "vanphong.jpg", char: "Darius.png", text: "Heirlock, Mainson, tôi có tin xấu, Kael vừa chết." }, // 714
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Cái gì, Kael chết sao, không phải cậu ta vừa được thả à?" }, // 715
  { bg: "vanphong.jpg", char: "Narrator", text: "Thông tin kì lạ khiến cho cả Heirlock và Mainson đều phải ngạc nhiên mà nhìn nhau như đang muốn đối phương nói rằng mình chỉ đang nghe nhầm thôi, và Kael mới được thả tạm giam 2 ngày trước không thể nào đã chết nhanh như vậy được." }, // 716
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Kael, gã ta chết vì lí do gì, tại sao lại chết được. Rõ ràng gã vừa mới được thả thôi mà?" }, // 717
  { bg: "vanphong.jpg", char: "Narrator", text: "Tiếng thở dài phát ra từ loa của chiếc điện thoại để bàn của Darius làm tâm trí hắn trùng xuống, lại một người chết nữa, rốt cuộc liệu đây có phải là một vụ án giết người hàng loạt đặc biệt nghiêm trọng hay không." }, // 718
  { bg: "vanphong.jpg", char: "Darius.png", text: "Ngã từ ban công tầng 6 xuống, lý do là chứng kiến một cảnh tượng quá đáng sợ." }, // 719
  { bg: "vanphong.jpg", char: "Narrator", text: "Heirlock và Mainson im lặng, mắt nhìn nhau, cả hai đều chưa hiểu cảnh tượng gì mà có thể khiến Kael mất mạng." }, // 720
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Cảnh tượng kinh hoàng nghĩa là gì? Anh có thể nói rõ hơn được không, Darius?" }, // 721
  { bg: "vanphong.jpg", char: "Darius.png", text: "Tôi không thể nói qua điện thoại hết, tốt nhất là các cậu tới hiện trường tự xem thì biết." }, // 722
  { bg: "vanphong.jpg", char: "Narrator", text: "Không hề chần chừ, chẳng ai nói với ai nhưng Heirlock và Mainson gần như đứng bật dậy cùng lúc, hắn vớ lấy chiếc áo khoác dạ của mình còn Mainson nhanh chóng đút cuốn sổ tay điều tra vào túi áo ngực trên chiếc sơ mi." }, // 723
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Ngài thám tử, chúng ta đi thôi." }, // 724
  { bg: "hientruongKael.jpg" }, // 725
  { bg: "hientruongKael.jpg", char: "Narrator", text: "Chỉ vài giờ sau, Heirlock và Mainson có mặt tại tòa nhà, tầng trệt mở ra trước mắt họ là một cảnh tượng khủng khiếp, thi thể Kael nằm ngửa dưới sân, thân bị thanh sắt hàng rào xuyên qua, máu lan ra nền xi măng ướt mưa, mọi thứ im lìm mà vẫn đầy ám ảnh." }, // 726
  { bg: "hientruongKael.jpg", char: "Heirlock.png", text: "Đây là… Kael?" }, // 727
  { bg: "hientruongKael.jpg", char: "Mainson.png", text: "Thật sự là không thể tin nổi, chỉ mới hai ngày trước cậu ta còn ở đây bình thường." }, // 728
  { bg: "hientruongKael.jpg", char: "Narrator", text: "Cảnh tượng mưa rả rích ngoài tòa nhà, ánh sáng nhạt của đèn đường chiếu xuống sân, thi thể Kael nằm đó, lạnh lẽo và vô tình." }, // 729
  { bg: "hientruongKael.jpg", char: "Narrator", text: "Nhìn lên tòa nhà, Heirlock theo ánh mắt Mainson, tầng 12 nơi Kael từng thấy cảnh tượng kinh hoàng, rốt cuộc là thứ gì có thể giết được Kael chỉ vì sợ hãi, nếu như có thì thứ ở trên tầng 12 có lẽ phải rất đáng sợ." }, // 730
  { bg: "hientruongKael.jpg", char: "Narrator", text: "Cả hai bước lên cầu thang, cúi đầu luồn qua tấm bạt màu vàng đánh dấu hiện trường, Mainson xuất trình thẻ cảnh sát và hai người nhanh chóng di chuyển lên trên." }, // 731
  { bg: "hientruongYanna.jpg" }, // 732
  { bg: "hientruongYanna.jpg", char: "Narrator", text: "Trước mắt Heirlock khi này là một căn phòng đầy máu, cảnh sát, phóng viên, nhà báo và thậm chí là cả Kam cũng đang có mặt bên cạnh một thi thể đã sớm chẳng còn hình người." }, // 733
  { bg: "hientruongYanna.jpg", char: "Narrator", text: "Heirlock tiến lại gần, định hỏi Kam lần này nạn nhân là ai và lí do tử vong là gì như đã thành thói quen, nhưng rồi những mẩu vụn sợi tóc màu hồng sáng rơi vãi trên sàn nhà cùng mùi hoa nhài ấy khiến hắn sững lại." }, // 734
  { bg: "hientruongYanna.jpg", char: "Heirlock.png", text: "Mainson, nói cho tôi biết là không phải đi." }, // 735
  { bg: "hientruongYanna.jpg", char: "Narrator", text: "Khi này vị pháp y Kam mới chịu đứng dậy, ngay khi bóng người đàn ông cao lớn ấy di chuyển, không còn che khuất thi thể nữa thì hắn mới được thấy tận mắt hai người đang nằm trên sàn ở ngay chính giữa căn phòng dính đầy máu đỏ tươi như thể được phun sơn." }, // 736
  { bg: "hientruongYanna.jpg", char: "Kam.png", text: "Heirlock của tôi, rất tiếc nhưng tôi sẽ phải nói điều này với anh, thi thể vừa được nhận dạng xong và xác định là Yanna lớp 12A1 trường trung học phổ thông K.K, bên cạnh là một người con trai tên Crow, bạn cùng lớp của Yanna." }, // 737
  { bg: "hientruongYanna.jpg", char: "Narrator", text: "Không khí như trở nên đông đặc khiến đầu óc hắn choáng váng, cô bé tóc hồng mới 2 ngày trước còn nói nếu muốn tìm hiểu thêm về vụ án Axton thì hãy tới buổi sáng ấy giờ đây đã lạnh ngắt trong tình trạng thảm thương." }, // 738
  { bg: "hientruongYanna.jpg", char: "Mainson.png", text: "Heirlock, là thật, là Yanna và Crow." }, // 739
  { bg: "chuong2.jpg" }, // 740
  { bg: "hientruongYanna.jpg", char: "Narrator", text: "Heirlock và Mainson bước vào căn phòng, ánh sáng mờ chiếu thẳng vào hiện trường, không gian nặng nề, mùi tanh tưởi của máu tươi tràn ngập." }, // 741
  { bg: "hientruongYanna.jpg", char: "Mainson.png", text: "Đây là Yanna phải không?" }, // 742
  { bg: "hientruongYanna.jpg", char: "Narrator", text: "Mainson ấp úng khi chứng kiến cảnh tượng kinh hoàng trước mặt, cậu cố gắng nhìn sang vị thám tử như muốn tìm cho mình một cái lắc đầu." }, // 743
  { bg: "hientruongYanna.jpg", char: "Heirlock.png", text: "Rất tiếc phải nói với cậu điều này, Mainson, đó thật sự là con bé." }, // 744
  { bg: "hientruongYanna.jpg", char: "Mainson.png", text: "Kh... không thể nào, mới mấy hôm trước, mới 2 ngày trước thôi con bé còn ở trước mắt chúng ta nói chuyện, cười đùa, thậm chí còn có cả một người bạn trai đi cùng." }, // 745
  { bg: "hientruongYanna.jpg", char: "Mainson.png", text: "Vậy tại sao bây giờ..." }, // 746
  { bg: "hientruongYanna.jpg", char: "Narrator", text: "Heirlock không đáp lời, hắn hiểu tại sao Mainson lại khó khăn để vượt qua sự thật này tới vậy." }, // 747
  { bg: "hientruongYanna.jpg", char: "Narrator", text: "Cậu ta vẫn chỉ là một cảnh sát mới vào nghề được một thời gian ngắn, có lẽ thấy những hiện trường máu me như thế này là hơi quá sức." }, // 748
  { bg: "hientruongYanna.jpg", char: "Heirlock.png", text: "Mainson, rồi cậu sẽ phải quen với những thứ này sớm thôi. Tới đây xem kĩ thi thể đi, trước khi nó được bên pháp y nhận lại." }, // 749
  { bg: "hientruongYanna.jpg", char: "Narrator", text: "Mainson chậm rãi bước tới từng bước khó nhọc, cậu nhìn lên cái thi thể đã nát tươm đang được ghim trên tường tựa như bức tranh chúa bị đóng trên thánh giá ấy mà mở to mắt." }, // 750
  { bg: "hientruongYanna.jpg", char: "Mainson.png", text: "Yanna, hai tay cô bé dang rộng như hình thánh giá, mắt đã bị lấy đi, con ngươi bị vứt trên sàn ngay cạnh chân." }, // 751
  { bg: "hientruongYanna.jpg", char: "Mainson.png", text: "Bụng bị rạch thẳng làm cho toàn bộ phần ruột trào ra theo vết rách đó, nội tạng dính lên tường trượt dần xuống đất." }, // 752
  { bg: "hientruongYanna.jpg", char: "Mainson.png", text: "Tóc Yanna bị cạo sát, móng tay mất hết, răng và lưỡi cũng không còn nhưng da lại không một vết bầm, anh nghĩ sao về điều này?" }, // 753
  { bg: "hientruongYanna.jpg", char: "Heirlock.png", text: "Mainson, cách đặt cơ thể, cách tổ chức hiện trường, không một chi tiết nào là ngẫu nhiên." }, // 754
  { bg: "hientruongYanna.jpg", char: "Narrator", text: "Heirlock nhìn một hồi rồi ngẫm nghĩ." }, // 755
  { bg: "hientruongYanna.jpg", char: "Heirlock.png", text: "Cô bé không hề phản kháng, có thể bị vô hiệu hóa từ trước hoặc hung thủ dùng phương pháp nào đó khiến nạn nhân hoàn toàn bất động." }, // 756
  { bg: "hientruongYanna.jpg", char: "Heirlock.png", text: "Và những thứ còn lại, từng chi tiết nhỏ đều để lại thông điệp nào đó, nhất là thứ kia." }, // 757
  { bg: "hientruongYanna.jpg", char: "Narrator", text: "Heirlock nói rồi nhìn sang vật thể lạ được đặt trên ghế, đối diện với thi thể của Yanna mà thì thầm." }, // 758
  { bg: "hientruongYanna.jpg", char: "Mainson.png", text: "Phải rồi, là Crow." }, // 759
  { bg: "hientruongYanna.jpg", char: "Narrator", text: "Mainson rùng mình khi nhận ra thứ được đặt trên ghế, quay về phía Yanna là một cái đầu của cậu trai Crow họ đã gặp ngày hôm ấy, vẫn là mái tóc gọn gàng cùng khuôn mặt quen thuộc kia nhưng chỉ khác là đôi mắt ấy giờ đỡ trợn trừng lên đầy sợ hãi." }, // 760
  { bg: "hientruongYanna.jpg", char: "Mainson.png", text: "Đầu bị tách ra khỏi cơ thể và đặt gọn gàng trên ghế, nhìn thẳng về Yanna, da thịt đầy vết bầm, xước, vết cứa nhưng không bị tách rời." }, // 761
  { bg: "hientruongYanna.jpg", char: "Narrator", text: "Cậu cố gắng kiềm chế cơn buồn nôn của bản thân khi phải đối mặt với hiện trường và thi thể ghê rợn này, tiếp lời." }, // 762
  { bg: "hientruongYanna.jpg", char: "Mainson.png", text: "Điều này thể hiện sự tàn nhẫn khác biệt với Yanna, tôi không hiểu nổi hung thủ đang muốn nói gì với hai thi thể được đặt trong vị trí kì lạ này." }, // 763
  { bg: "hientruongYanna.jpg", char: "Narrator", text: "Khi này Heirlock nghe một hồi rồi mới lên tiếng, hắn nhìn về phía chiếc đầu tách rời của Crow trên ghế, đặt một cách trịnh trọng ở vị trí bên dưới và đối diện như thể một tín đồ đang tôn thờ vị thần của mình." }, // 764
  { bg: "hientruongYanna.jpg", char: "Heirlock.png", text: "Hung thủ muốn tạo sự tương phản rõ rệt, Yanna bị trừng phạt cực kỳ man rợ, từng chi tiết đều được tinh chỉnh còn Crow thì lại không có nhiều dấu vết của sự tra tấn tới vậy." }, // 765
  { bg: "hientruongYanna.jpg", char: "Mainson.png", text: "Phải, những vết bầm này là do phản ứng chống lại khi tự vệ mà thành, không phải bởi vì bị tra tấn thụ động." }, // 766
  { bg: "hientruongYanna.jpg", char: "Heirlock.png", text: "Và với từng đó việc hắn ta đã làm với thi thể và vẫn còn đủ thời gian để che giấu vết tích hiện trường tới nỗi không một ai biết cho tới khi Kael xuất hiện thì không thể là hành động bộc phát." }, // 767
  { bg: "hientruongYanna.jpg", char: "Heirlock.png", text: "Rõ ràng có thể thấy, hung thủ nhắm tới việc trả thù Yanna, còn cậu trai Crow này..." }, // 768
  { bg: "hientruongYanna.jpg", char: "Narrator", text: "Hắn ngưng lại một lúc rồi thở dài." }, // 769
  { bg: "hientruongYanna.jpg", char: "Heirlock.png", text: "Có lẽ chỉ là vô tình bị cuốn vào thôi, vết thương trên người cậu ta hầu hết là vết cào do móng tay và bị vật sắc nhọn cứa vào, nhưng nhìn này." }, // 770
  { bg: "hientruongYanna.jpg", char: "Narrator", text: "Nói rồi Heirlock chỉ vào vết xước gần tay của Crow." }, // 771
  { bg: "hientruongYanna.jpg", char: "Mainson.png", text: "Là sơn hồng?" }, // 772
  { bg: "hientruongYanna.jpg", char: "Heirlock.png", text: "Đúng vậy, móng tay hồng, Mainson, cậu nghĩ xem là ai gây ra vết thương này." }, // 773
  { bg: "hientruongYanna.jpg", char: "Narrator", text: "Mainson quay ngoắt lại phía sau nhìn vào phần thi thể đang bị ghim trên tường, mấp máy." }, // 774
  { bg: "hientruongYanna.jpg", char: "Mainson.png", text: "Là... Yanna?" }, // 775
  { bg: "hientruongYanna.jpg", char: "Narrator", text: "Heirlock gật đầu." }, // 776
  { bg: "hientruongYanna.jpg", char: "Heirlock.png", text: "Đúng, đó là móng tay của Yanna, chắc cậu cũng nhớ rồi chứ, hôm trước mình nói chuyện với cô bé, nó đã có cái móng tay hồng này rồi." }, // 777
  { bg: "hientruongYanna.jpg", char: "Heirlock.png", text: "Với cả xem kỹ này, các chi tiết nhỏ như móng tay bị cắt sạch, tóc cạo sát, răng và lưỡi của Yanna biến mất là hung thủ muốn tước đi hết dấu hiệu nhận dạng." }, // 778
  { bg: "hientruongYanna.jpg", char: "Heirlock.png", text: "Nhưng tên đó vẫn giữ nguyên da không một vết bầm cho thấy kỹ năng chuyên nghiệp, hoặc ít nhất, tên đó có khả năng khống chế con bé tuyệt đối khi tra tấn" }, // 779
  { bg: "hientruongYanna.jpg", char: "Mainson.png", text: "Nhìn Crow, đầu bị chặt ra nhưng được đặt gọn trên ghế, hai mắt mở to nhìn về phía Yanna, cơ thể đầy bầm tím nhiều vết xước và vết cứ." }, // 780
  { bg: "hientruongYanna.jpg", char: "Mainson.png", text: "Ngoài trừ phần đầu thì cơ thể không bị tách rời bất cứ bộ phận nào khác, nghĩa là hung thủ không muốn khiến Crow đau đớn thống khổ, phải chứ, dù sao mất đầu là cũng mất ý thức rồi." }, // 781
  { bg: "hientruongYanna.jpg", char: "Heirlock.png", text: "Chính xác, chúng ta đang đứng trước kịch bản có chủ đích, Mainson, từng chi tiết, từng vết máu và từng vị trí thi thể đều cho thấy sự tinh vi và sự sắp xếp chuẩn xác, hung thủ muốn khiến những người còn sống, kể cả chúng ta phải sợ hãi và rối loạn tinh thần." }, // 782
  { bg: "hientruongYanna.jpg", char: "Narrator", text: "Hai người đứng giữa phòng, mắt quét khắp hiện trường, yên lặng mà căng thẳng, mùi tanh sắt và máu khiến không khí nặng nề, từng chi tiết đều là manh mối cho những suy đoán tiếp theo" }, // 783
  { bg: "hientruongYanna.jpg", char: "Narrator", text: "Hiện giờ có lẽ họ nên tới xem thi thể của Kael, kẻ đã bị dọa bởi cảnh tượng này tới mức sợ hãi ngã ra khỏi ban công." }, // 784
  { bg: "hientruongKael.jpg" }, // 785
  { bg: "hientruongKael.jpg", char: "Narrator", text: "Heirlock và Mainson bước tới hiện trường ban công nơi Kael gặp nạn, ánh sáng sớm chiếu qua từng kẽ lá, tiếng gió xào xạc bên tai khiến khung cảnh quá đỗi yên bình, trái ngược hoàn toàn với những gì xảy ra trước mắt hắn." }, // 786
  { bg: "hientruongKael.jpg", char: "Mainson.png", text: "Kael rơi từ đây, tầm cao là 12 tầng trúng hàng rào sắt nhọn phía dưới, tử vong chủ yếu là do mất máu, mắt mở to, rõ ràng sợ hãi đến cùng cực trước khi chết, không có dấu hiệu tác động từ người khác và chỉ có duy nhất dấu chân của Kael quanh ban công lần hiện trường nơi Yanna và Crow chết." }, // 787
  { bg: "hientruongKael.jpg", char: "Heirlock.png", text: "Tất cả dấu vết khác đều được che giấu, không một dấu chân hay vết di chuyển nào khác, ngay cả những mảnh vụn nhỏ, mọi thứ đều như thể hung thủ không muốn để lại bất kỳ dấu tích nào cho cảnh sát vậy." }, // 788
  { bg: "hientruongKael.jpg", char: "Heirlock.png", text: "Trái ngược hoàn toàn với vụ án của Axton, hung thủ đã để lại rất nhiều dấu vết, thậm chí còn không quên đặt thêm dấu giày và cuốn sổ tay để mọi nghi ngờ nhắm vào Kael nữa." }, // 789
  { bg: "hientruongKael.jpg", char: "Mainson.png", text: "Nhìn quanh không có vật dụng nào bị xáo trộn, lan can, khung cửa, tất cả đều nguyên vẹn, chỉ có Kael là nạn nhân duy nhất, điều này nói lên rằng hắn không phải là kẻ bị ép mà là người chứng kiến cảnh tượng quá kinh hoàng khiến mất thăng bằng và rơi xuống." }, // 790
  { bg: "hientruongKael.jpg", char: "Narrator", text: "Heirlock trầm ngâm một lúc, biết đâu hung thủ có thể chủ động đẩy Kael xuống nhưng rồi xóa đi mọi dấu vết chăng, nhưng điều đó quá khó, vết máu trên quần áo, vân tay, dấu giày dính máu, quá nhiều thứ để có thể dọn dẹp hoàn hảo không tì vết tới nỗi cảnh sát cũng tìm chẳng ra như hiện tại." }, // 791
  { bg: "hientruongKael.jpg", char: "Heirlock.png", text: "Kael thể hiện rõ sự sợ hãi qua cách mắt mở to, cơ thể co giật khi va chạm với hàng rào và một điều nữa, Mainson, hung thủ đã tính toán kỹ, che giấu mọi dấu vết, chứng tỏ hắn hiểu rõ các bước điều tra để có thể không để lại bất cứ một sơ hở nào như vậy." }, // 792
  { bg: "hientruongKael.jpg", char: "Narrator", text: "Hai người đứng im giữa ban công, mắt quét quanh khu vực, chỉ còn lại cơn gió lạnh và mùi sắt tanh nhẹ thoang thoảng trong không khí." }, // 793
  { bg: "hientruongKael.jpg", char: "Mainson.png", text: "Chúng ta quay lại văn phòng thôi, Heirlock, tôi sẽ gọi điện xác minh thêm một lượt nữa." }, // 794
  { bg: "hientruongKael.jpg", char: "Narrator", text: "Heirlock gật đầu, hiện giờ cũng đã có thể coi là xong việc ở hiện trường rồi, phần còn lại là công đoạn của Kam, pháp y cùng với những đội điều tra khác." }, // 795
  { bg: "vanphong.jpg" }, // 796
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Alo, tôi vừa tới hiện trường Kael, kiểm tra kỹ xung quanh, không còn dấu tích nào của người thứ ba, đúng là tất cả đều đã bị xóa, khu nhà đó là nhà của Crow, dạng nhà thuê, Yanna từng ở chung với Crow, trước đó cô bé thuê nhà ở khu UMF, tất cả khớp với những gì chúng ta đoán." }, // 797
  { bg: "vanphong.jpg", char: "Narrator", text: "Mainson ngắt cuộc điện thoại, vẻ mặt nghiêm túc nhìn về phía vị thám tử." }, // 798
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Vậy thì mọi chuyện càng phức tạp hơn, hung thủ không chỉ dọn sạch dấu vết ở hiện trường Kael mà còn biết rõ mối quan hệ giữa Yanna và Crow." }, // 799
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Nhưng một câu hỏi khiến tôi đặt ra, sao Kael lại tới nơi ở của Crow?" }, // 800
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Tôi có hỏi mọi người trong trại tạm giam, thấy bảo gã vừa được thả đi đã lập tức đòi tìm kiếm Yanna để chất vấn vì tại cô bé mà gã mới nằm trong diện tình nghi. Nhưng rồi kết cục của cuộc chất vấn đó ra sao thì chúng ta đều biết rồi." }, // 801
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Bằng một cái chết đầy thảm thương, khổ thân Kael của tôi." }, // 802
  { bg: "vanphong.jpg", char: "Narrator", text: "Heirlock cười nhạt, hắn nắm chặt lòng bàn tay, tự trách bản thân vô dụng nên mới không thể bảo vệ được người vô tội như Kael, dù cho gã là một người sốc nổi, bốc đồng và nóng nẩy nhưng gã chưa từng làm điều gì vi phạm pháp luật." }, // 803
  { bg: "vanphong.jpg", char: "Narrator", text: "Vậy mà giờ đây chỉ vì chút sai sót của hắn, Kael đã không còn trên cuộc đời này nữa." }, // 804
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Có lẽ cái chết của Kael là do còn đang định hủng hổ xông vào chất vấn thì nhìn thấy cảnh tượng này nên ngã chết chăng?" }, // 805
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Không thể nào, một người bình thường bước vào từ cửa lớn, dù có hoảng sợ và rối loạn thì cũng ngã khụy xuống sàn chứ không thể lùi về tận phía ban công để ngã xuống được. Trừ khi…" }, // 806
  { bg: "vanphong.jpg", char: "Narrator", text: "Heirlock dừng lại một lúc khiến Mainson tò mò, cậu nhìn lên hắn như đang chờ đợi câu trả lời." }, // 807
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Trừ khi lúc Kael đến, hung thủ vẫn còn ở đó và đang lau dọn hiện trường, hoặc đang ra tay với nạn nhân nên gã mới hoảng loạn tới vậy." }, // 808
  { bg: "vanphong.jpg", char: "Narrator", text: "Mainson rùng mình, như thế có một luồng điện chạy dọc sống lưng cậu, quả thực những gì Heirlock nói rất đúng, vậy Kael trước khi chết đã thực sự thấy được mặt của hung thủ, có lẽ từng mang suy nghĩ trốn chạy nhưng bị kẻ kia dồn tới mức hoảng loạn mà đi sang ban công rồi ngã xuống." }, // 809
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Nếu như vậy thì khó rồi đây, người có liên kết với Axton và Yanna quá nhiều, thậm chí nói cả ngôi trường K.K đều là nghi phạm cũng chẳng sai." }, // 810
  { bg: "vanphong.jpg", char: "Narrator", text: "Một cuộc gọi tới, đầu dây bên kia vang lên giọng nói khàn đặc." }, // 811
  { bg: "vanphong.jpg", char: "Darius.png", text: "Hai người có ở đó chứ, thám tử Heirlock?" }, // 812
  { bg: "vanphong.jpg", char: "Narrator", text: "Heirlock nhíu mày, hắn không thích trao đổi với tên thượng tá này bởi ông ta luôn là kẻ tham thành tích, vụ án của Axton trước đó cũng hướng vào việc nhanh nhanh chóng chóng kết tội Kael để có được thưởng chứ chẳng thực sự quan tâm tới sự thật phía sau." }, // 813
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Có chuyện gì vậy, ngài thượng tá?" }, // 814
  { bg: "vanphong.jpg", char: "Darius.png", text: "Heirlock, cậu mau chóng tìm ra hung thủ và kết thúc vụ án đi, nếu kéo dài lâu bên trên sẽ đánh giá xấu cục của tôi mất." }, // 815
  { bg: "vanphong.jpg", char: "Narrator", text: "Hắn còn đang định lên tiếng phản bác Darius thì đã bị ông ta chặn lại." }, // 816
  { bg: "vanphong.jpg", char: "Darius.png", text: "Phải rồi, bên pháp y có kết quả giám định rồi đấy, hai người có thể qua." }, // 817
  { bg: "vanphong.jpg", char: "Narrator", text: "Cuộc gọi nhanh chóng kết thúc, Mainson nhìn về phía Heirlock rồi thở dài." }, // 818
  { bg: "vanphong.jpg", char: "Mainson.png", text: "Xin lỗi anh, thượng tá vẫn luôn như vậy, ông ấy có chút…" }, // 819
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Thôi được rồi, không quan trọng lắm, mặc kệ ông ta là được. Giờ thì cậu đi điều tra thêm về những mối quan hệ xung quanh Yanna và Crow trong trường đi, biết đâu thêm được manh mối gì đó còn tôi sẽ tới phòng pháp y xem sao." }, // 820
  { bg: "vanphong.jpg", char: "Narrator", text: "Hắn thở dài, tiếp tục." }, // 821
  { bg: "vanphong.jpg", char: "Heirlock.png", text: "Dù sao cũng bị giục rồi, chúng ta không thể chậm trễ nữa." }, // 822


];
let index = 0;
let isTyping = false;
let typingInterval;

// === STORAGE ===
function saveProgress() {
  localStorage.setItem(saveKey, index);
}
function loadProgress() {
  index = parseInt(localStorage.getItem(saveKey)) || 0;
}
function saveCheckpoint() {
  localStorage.setItem(checkpointKey, index);
}
function loadCheckpoint() {
  return parseInt(localStorage.getItem(checkpointKey));
}
function resetProgress() {
  localStorage.removeItem(saveKey);
  localStorage.removeItem(checkpointKey);
  index = 0;
}

// === SCENE DISPLAY ===
function changeScene(scene) {
  bgEl.style.opacity = 0;
  charEl.style.opacity = 0;

  setTimeout(() => {
    bgEl.src = `asset/backgrounds/${scene.bg}`;
    bgEl.style.opacity = 1;

    if (!scene.text) dialogueBox.style.display = "none";
    else dialogueBox.style.display = "block";

    if (scene.char && scene.char.toLowerCase() !== "narrator") {
      const displayName = scene.char.replace(".png", "");
      document.getElementById("nameBox").textContent = displayName;
      charEl.src = `asset/characters/${scene.char}`;
      charEl.style.opacity = 1;
    } else {
      document.getElementById("nameBox").textContent = "Narrator";
      charEl.style.opacity = 0;
    }
  }, 200);
}

// === TYPEWRITER EFFECT (version: no skip allowed) ===
function typeLine(line) {
  clearInterval(typingInterval);
  textEl.innerHTML = "";
  let i = 0;

  isTyping = true;

  typingInterval = setInterval(() => {
    textEl.innerHTML += line[i];
    i++;
    if (i >= line.length) {
      clearInterval(typingInterval);
      isTyping = false;
    }
  }, 25);
}

// === CHOICES ===
function showChoices(scene) {
  choiceBox.innerHTML = "";
  choiceBox.style.display = "flex";
  saveCheckpoint();

  scene.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "choiceBtn";
    btn.textContent = opt.text;
    btn.onclick = () => handleChoice(opt);
    choiceBox.appendChild(btn);
  });
}

function handleChoice(opt) {
  choiceBox.style.display = "none";
  index = opt.next;
  changeScene(scenes[index]);
  typeLine(scenes[index].text);
  saveProgress();

  document.body.onclick = async function nextBranch() {
    if (isTyping) return;

    if (index < opt.end) {
      index++;
      changeScene(scenes[index]);
      typeLine(scenes[index].text || "");
      saveProgress();
    } else {
      if (opt.ending && endings[opt.ending]) {
        endings[opt.ending].unlocked = true;
        localStorage.setItem("endings", JSON.stringify(endings));
      }
      showEndPopup();
    }
  };
}

// === END POPUP ===
function showEndPopup() {
  document.body.onclick = null;

  bgMusic.pause();
  bgMusic.currentTime = 0;
  endMusic.currentTime = 0;
  endMusic.play();

  const popup = document.getElementById("endPopup");
  popup.style.display = "flex";

  document.getElementById("popupBackMenu").onclick = (e) => {
    e.stopPropagation();
    popup.style.display = "none";
    gameEl.style.display = "none";
    menuEl.style.display = "flex";
  };
}

// === MAIN LOOP ===
function showNext() {
  if (isTyping) return;

  const scene = scenes[index];
  if (scene.choice) return showChoices(scene);

  index++;
  if (index < scenes.length) {
    const next = scenes[index];
    changeScene(next);

    if (next.text) {
      dialogueBox.style.display = "block";
      typeLine(next.text);
    } else {
      dialogueBox.style.display = "none";
    }

    saveProgress();
  } else textEl.innerHTML = "— Hết —";
}

// === ENDINGS MENU ===
document.getElementById("endingsBtn").addEventListener("click", () => {
  const endingList = document.getElementById("endingList");
  endingList.innerHTML = "";

  const stored = JSON.parse(localStorage.getItem("endings")) || endings;

  Object.entries(stored).forEach(([key, data]) => {
    const item = document.createElement("div");
    item.className = "ending-item";
    item.textContent = data.name;
    if (data.unlocked) item.classList.add("unlocked");
    endingList.appendChild(item);
  });

  document.getElementById("endingGallery").style.display = "flex";
});

document
  .getElementById("backToMenuFromEndings")
  .addEventListener("click", () => {
    document.getElementById("endingGallery").style.display = "none";
  });

// === BUTTONS ===
document.getElementById("continueBtn").addEventListener("click", () => startGame(false));
document.getElementById("restartBtn").addEventListener("click", () => startGame(true));

// === START GAME ===
function startGame(fromStart = false) {
  menuEl.style.display = "none";
  gameEl.style.display = "block";

  if (fromStart) resetProgress();
  else loadProgress();

  const scene = scenes[index] || scenes[0];
  changeScene(scene);

  if (scene.text) {
    dialogueBox.style.display = "block";
    typeLine(scene.text);
  } else {
    dialogueBox.style.display = "none";
  }
  bgMusic.currentTime = 0;
  bgMusic.play();
  const waitForTyping = setInterval(() => {
    if (!isTyping) {
      document.body.onclick = showNext;
      clearInterval(waitForTyping);
    }
  }, 100);
}
